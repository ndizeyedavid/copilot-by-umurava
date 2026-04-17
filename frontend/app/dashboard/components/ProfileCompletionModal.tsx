"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Upload, FileText, ArrowRight, X, Loader2 } from "lucide-react";
import { api } from "@/lib/api/client";
import toast from "react-hot-toast";

interface ProfileCompletionModalProps {
  missingFields: string[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function ProfileCompletionModal({
  missingFields,
  isOpen,
  onClose,
  onComplete,
}: ProfileCompletionModalProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const parseResumeMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/talents/parse-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Resume parsed successfully!");
      onComplete?.();
      onClose();
      router.push("/dashboard/profile");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to parse resume");
    },
  });

  const handleFileChange = (file: File | null) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file || null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    parseResumeMutation.mutate(formData);
  };

  const handleManualEntry = () => {
    onClose();
    router.push("/dashboard/profile");
  };

  if (!isOpen) return null;

  const fieldLabels: Record<string, string> = {
    headline: "Professional Headline",
    location: "Location",
    skills: "Skills",
    experience: "Work Experience",
    availability: "Availability Status",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <FileText className="w-8 h-8 text-[#286ef0]" />
          </div>

          <h2 className="text-2xl font-black text-[#25324B] text-center mb-2">
            Complete Your Profile
          </h2>
          <p className="text-[#7C8493] text-center mb-6">
            To get the best experience, please complete your profile. You can
            either upload your resume for automatic parsing or fill in the
            details manually.
          </p>

          {missingFields.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Missing Information:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingFields.map((field) => (
                  <span
                    key={field}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-[#25324B]"
                  >
                    {fieldLabels[field] || field}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive
                ? "border-[#286ef0] bg-blue-50"
                : "border-gray-200 hover:border-[#286ef0]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragActive(false)}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />

            {selectedFile ? (
              <div>
                <p className="text-sm font-semibold text-[#25324B]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-[#7C8493] mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-[#25324B]">
                  Drop your resume here or click to upload
                </p>
                <p className="text-xs text-[#7C8493] mt-1">
                  PDF format only, max 10MB
                </p>
              </div>
            )}
          </div>

          {selectedFile && (
            <button
              onClick={handleSubmit}
              disabled={parseResumeMutation.isPending}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-[#286ef0] text-white rounded-xl font-bold text-sm hover:bg-[#1f5fe0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {parseResumeMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Parsing Resume...
                </>
              ) : (
                <>
                  Parse & Fill Profile
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-[#7C8493]">or</span>
            </div>
          </div>

          <button
            onClick={handleManualEntry}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-[#25324B] rounded-xl font-bold text-sm hover:border-[#286ef0] hover:text-[#286ef0] transition-all"
          >
            Enter Details Manually
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}