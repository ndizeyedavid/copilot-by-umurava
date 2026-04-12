# Copilot by Umurava

> An AI Recruiter system that explains, compares, and guides hiring decisions

# DB Structure

### 1. Jobs

```yaml
{
  title: string,
  description: string,
  requirements: string[],
  weights: {
    skills: number,
    experience: number,
    education: "A2" | "A1" | "PhD" | "A0"
  };
}
```

### 2. Candidates

```Yaml
{
  firstName: string,
  lastName: string,
  email: string,
  headline: string,
  bio?: string,
  location: string,
  skills: ISkills[],
  languages?: ILanguage[],
  experience: IExperience[],
  education: IEducation[],
  certifications?: ICertifications[],
  projects: IProjects[],
  availability: IAvailability,
  socialLinks: string[],
  rawCv?: any,
}
```

### 3. Screening

```yaml
{
  _id: ObjectId,
  jobId: ObjectId,

  candidates: [
    {
      candidateId: ObjectId,

      score: number, // ~100%
      confidence: "high" | "medium" | "low",

      strengths: string[],
      gaps: string[],
      reasoning: string,

      comparisonNotes: string, // UVP

      rank: number
    }
  ],

  createdAt: Date
}
```

### 4. analysisLogs

```json
{
  jobId: ObjectId,
  prompt: string,
  response: object,
  createdAt: Date
}
```

# AI Design [structued json outputs] > gemma-4-31b-it

## Resume parsing prompt

```yaml
Extract:
  - Skills
  - Years of experience
  - Education
  - Projects
  - Summary
```

## Ranking & Reasoning prompt

```yaml
You are a senior recruiter.

Job:
[...]
Candidates:
[...]

Tasks:
1. Rank top 10
2. Score each (0–100)
3. For each candidate provide:
   - strengths
   - gaps
   - reasoning
   - comparison to top candidate
   - confidence level

Analyze also another field "Why not 1":
    - example: "Although strong in React, lacks system design experience compared to #1 candidate"

Be strict. Do not give similar scores unless justified
```
