"use client";

import { useState } from "react";
import Link from "next/link";

type FileState = {
  idDocument?: File | null;
  certificates?: FileList | null;
  cv?: File | null;
  other?: FileList | null;
};

export default function MentorDocumentsPage() {
  const [files, setFiles] = useState<FileState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSingleFileChange(
    key: keyof FileState,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  }

  function handleMultiFileChange(
    key: keyof FileState,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const fileList = event.target.files ?? null;
    setFiles((prev) => ({ ...prev, [key]: fileList }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    // 📝 For now we’re just simulating an upload.
    // Later we’ll send these to an API route / storage provider.
    console.log("Files selected:", files);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Documents submitted (demo). We’ll connect real storage next.");
    setIsSubmitting(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Upload Documents</h1>
      <p className="text-slate-600 mb-8">
        Please upload clear scans or photos of your documents. We use these to
        verify your identity and qualifications.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ID / Passport */}
        <section>
          <h2 className="font-semibold text-lg mb-2">
            1. Government ID / Passport
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            Upload a passport or government-issued ID. JPG, PNG, or PDF.
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleSingleFileChange("idDocument", e)}
            className="block w-full text-sm text-slate-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-slate-900 file:text-white
                       hover:file:bg-slate-700"
          />
          {files.idDocument && (
            <p className="mt-2 text-xs text-slate-500">
              Selected: {files.idDocument.name}
            </p>
          )}
        </section>

        {/* Certificates */}
        <section>
          <h2 className="font-semibold text-lg mb-2">
            2. Academic Certificates
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            Upload degree certificates, transcripts, or other proof of
            qualification. You can select multiple files.
          </p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleMultiFileChange("certificates", e)}
            className="block w-full text-sm text-slate-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-slate-900 file:text-white
                       hover:file:bg-slate-700"
          />
          {files.certificates && files.certificates.length > 0 && (
            <ul className="mt-2 text-xs text-slate-500 space-y-1">
              {Array.from(files.certificates).map((file) => (
                <li key={file.name}>• {file.name}</li>
              ))}
            </ul>
          )}
        </section>

        {/* CV */}
        <section>
          <h2 className="font-semibold text-lg mb-2">3. CV / Résumé</h2>
          <p className="text-sm text-slate-600 mb-3">
            Upload your latest CV or résumé. PDF preferred.
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleSingleFileChange("cv", e)}
            className="block w-full text-sm text-slate-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-slate-900 file:text-white
                       hover:file:bg-slate-700"
          />
          {files.cv && (
            <p className="mt-2 text-xs text-slate-500">
              Selected: {files.cv.name}
            </p>
          )}
        </section>

        {/* Other */}
        <section>
          <h2 className="font-semibold text-lg mb-2">4. Other documents</h2>
          <p className="text-sm text-slate-600 mb-3">
            Optional: any extra supporting documents (awards, publications,
            references, etc.).
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => handleMultiFileChange("other", e)}
            className="block w-full text-sm text-slate-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-slate-900 file:text-white
                       hover:file:bg-slate-700"
          />
          {files.other && files.other.length > 0 && (
            <ul className="mt-2 text-xs text-slate-500 space-y-1">
              {Array.from(files.other).map((file) => (
                <li key={file.name}>• {file.name}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Link
            href="/mentor-dashboard"
            className="text-sm text-slate-600 hover:underline"
          >
            ← Back to dashboard
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Uploading…" : "Submit documents"}
          </button>
        </div>
      </form>
    </main>
  );
}
