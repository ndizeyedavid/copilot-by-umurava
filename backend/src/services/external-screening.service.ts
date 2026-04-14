import csv from "csv-parser";
import xlsx from "xlsx";
import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import ENV from "../config/env";
import {
  IExternalApplicant,
  ParsedResume,
} from "../types/external-screening.types";

const genAI = new GoogleGenAI({ apiKey: ENV.gemingi_api_key });

export async function parseSpreadsheet(
  filePath: string,
): Promise<IExternalApplicant[]> {
  const ext = path.extname(filePath).toLowerCase();
  const applicants: IExternalApplicant[] = [];

  if (ext === ".csv") {
    return parseCSV(filePath);
  } else if (ext === ".xlsx" || ext === ".xls") {
    return parseExcel(filePath);
  }

  throw new Error(
    "Unsupported file format. Only CSV and Excel files are allowed.",
  );
}

function parseCSV(filePath: string): Promise<IExternalApplicant[]> {
  return new Promise((resolve, reject) => {
    const results: IExternalApplicant[] = [];
    let rowIndex = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: any) => {
        rowIndex++;
        const applicant = mapRowToApplicant(data, `csv-row-${rowIndex}`);
        if (applicant.email) {
          results.push(applicant);
        }
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

function parseExcel(filePath: string): IExternalApplicant[] {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(worksheet);

  return rows
    .map((row: any, index: number) =>
      mapRowToApplicant(row, `excel-row-${index + 1}`),
    )
    .filter((a: IExternalApplicant) => a.email);
}

function mapRowToApplicant(row: any, id: string): IExternalApplicant {
  // Flexible column mapping - handles various naming conventions
  const firstName =
    row.firstName || row.first_name || row.FirstName || row["First Name"] || "";
  const lastName =
    row.lastName || row.last_name || row.LastName || row["Last Name"] || "";
  const email = row.email || row.Email || row.EMAIL || row["E-mail"] || "";
  const phone =
    row.phone || row.phone_number || row.Phone || row["Phone Number"] || "";
  const headline =
    row.headline || row.title || row.position || row.Headline || "";
  const resumeUrl =
    row.resumeUrl ||
    row.resume_url ||
    row.resume ||
    row["Resume URL"] ||
    row["Resume Link"] ||
    "";

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    headline,
    resumeUrl,
    resumeText: "",
    source: "external",
    rawData: row,
  };
}

export async function fetchAndParseResume(
  applicant: IExternalApplicant,
): Promise<ParsedResume | null> {
  try {
    let resumeText = "";

    if (applicant.resumeUrl) {
      // Download and parse PDF from URL
      if (applicant.resumeUrl.endsWith(".pdf")) {
        resumeText = await downloadAndParsePDF(applicant.resumeUrl);
      } else {
        // For non-PDF links, we'll rely on the AI to process whatever content is available
        resumeText = `[Resume available at: ${applicant.resumeUrl}]`;
      }
    }

    // If no resume URL or failed to parse, create minimal data from applicant info
    if (!resumeText) {
      resumeText = `Name: ${applicant.firstName} ${applicant.lastName}
Email: ${applicant.email}
Headline: ${applicant.headline || "Not provided"}`;
    }

    // Use AI to structure the resume text into ParsedResume format
    return await structureResumeWithAI(resumeText, applicant);
  } catch (error) {
    console.error(`Failed to parse resume for ${applicant.email}:`, error);
    return null;
  }
}

async function downloadAndParsePDF(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 30000,
    });
    const pdfBuffer = Buffer.from(response.data);
    const parsed = await pdfParse(pdfBuffer);
    return parsed.text;
  } catch (error) {
    console.error("PDF download/parse failed:", error);
    return "";
  }
}

async function structureResumeWithAI(
  resumeText: string,
  applicant: IExternalApplicant,
): Promise<ParsedResume> {
  try {
    const prompt = buildResumeParsingPrompt(resumeText, applicant);

    const response = await genAI.models.generateContent({
      model: ENV.gemini_model,
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    const parsed: ParsedResume = JSON.parse(text);

    // Ensure required fields with fallbacks
    return {
      firstName: parsed.firstName || applicant.firstName,
      lastName: parsed.lastName || applicant.lastName,
      email: parsed.email || applicant.email,
      phone: parsed.phone || applicant.phone || "",
      headline: parsed.headline || applicant.headline || "",
      summary: parsed.summary || resumeText.slice(0, 500),
      skills: parsed.skills || [],
      experience: parsed.experience || [],
      education: parsed.education || [],
      certifications: parsed.certifications || [],
    };
  } catch (error) {
    console.error("Gemini resume parsing failed:", error);
    // Fallback to basic extraction
    return {
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      phone: applicant.phone || "",
      headline: applicant.headline || "",
      summary: resumeText.slice(0, 500),
      skills: [],
      experience: [],
      education: [],
      certifications: [],
    };
  }
}

function buildResumeParsingPrompt(
  resumeText: string,
  applicant: IExternalApplicant,
): string {
  return `You are an expert resume parser and data extractor. Extract structured information from the following resume text.

## APPLICANT BASICS (use as hints if text is unclear)
- Name: ${applicant.firstName} ${applicant.lastName}
- Email: ${applicant.email}
- Phone: ${applicant.phone || "Not provided"}
- Headline: ${applicant.headline || "Not provided"}

## RESUME TEXT TO PARSE
\`\`\`
${resumeText.slice(0, 8000)} // Limit to avoid token overflow
\`\`\`

## TASK
Extract and return STRICT JSON with this structure:

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "headline": "string - professional title/summary",
  "summary": "string - 2-3 sentence professional summary",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "company": "string",
      "role": "string - job title",
      "description": "string - key responsibilities and achievements",
      "startDate": "string (optional) - e.g., '2020-01' or 'Jan 2020'",
      "endDate": "string (optional) - e.g., '2023-12' or 'Present'"
    }
  ],
  "education": [
    {
      "institution": "string - university/school name",
      "degree": "string - e.g., 'Bachelor of Science', 'MBA'",
      "field": "string - e.g., 'Computer Science', 'Business Administration'"
    }
  ],
  "certifications": ["Certification Name - Issuer", "Another Cert"]
}

## RULES
1. Extract ALL skills mentioned - technical, soft skills, tools, languages
2. For experience: include ALL jobs found with descriptions
3. For education: include degrees, certifications, bootcamps
4. Dates: use original format from text or YYYY-MM
5. Be thorough - don't miss any information
6. If a field is not found, use empty string/array
7. Return ONLY valid JSON, no markdown, no explanations`;
}

export function cleanupUploadedFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Failed to cleanup uploaded file:", error);
  }
}
