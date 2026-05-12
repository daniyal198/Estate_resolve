"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { CloseIcon, DocumentIcon } from "@/app/components/Icons";
import { uploadConstraints } from "@/app/lib/validation";

type DocumentUploadProps = {
  disabled?: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

function formatFileSize(size: number) {
  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function DocumentUpload({
  disabled = false,
  files,
  setFiles,
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const acceptedTypesSummary = useMemo(
    () => uploadConstraints.acceptedMimeTypes.join(", "),
    [],
  );

  const validateIncomingFiles = useCallback(
    (incomingFiles: File[]) => {
      if (incomingFiles.length === 0) {
        return { nextFiles: [], validationError: "No valid files were selected." };
      }

      if (files.length + incomingFiles.length > uploadConstraints.maxFileCount) {
        return {
          nextFiles: [],
          validationError: `You can upload up to ${uploadConstraints.maxFileCount} files.`,
        };
      }

      for (const file of incomingFiles) {
        if (
          !uploadConstraints.acceptedMimeTypes.includes(file.type as never)
        ) {
          return {
            nextFiles: [],
            validationError: "Only PDF, JPG, and PNG files are allowed.",
          };
        }

        if (file.size > uploadConstraints.maxFileSizeBytes) {
          return {
            nextFiles: [],
            validationError: "Each file must be 10MB or smaller.",
          };
        }
      }

      return { nextFiles: incomingFiles, validationError: null };
    },
    [files.length],
  );

  const appendFiles = useCallback(
    (incomingList: FileList | null) => {
      if (!incomingList) {
        return;
      }

      const incomingFiles = Array.from(incomingList);
      const { nextFiles, validationError } = validateIncomingFiles(incomingFiles);

      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setFiles((currentFiles) => [...currentFiles, ...nextFiles]);
    },
    [setFiles, validateIncomingFiles],
  );

  function removeFile(index: number) {
    setFiles((currentFiles) => currentFiles.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <section className="border-b border-brand-border pb-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-brand-navy">
            Required supporting documents
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-slate">
            Please upload copies of the documents below so we can verify the
            estate instruction and your authority to act.
          </p>
        </div>
        <div className="hidden rounded-full border border-brand-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate md:block">
          Up to {uploadConstraints.maxFileCount} files
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-border bg-brand-ivory px-6 py-6">
        <ul className="space-y-3 text-sm leading-7 text-brand-slate">
          <li>
            Death certificate or interim coroner&apos;s certificate
          </li>
          <li>
            A form of authority appointing you as executor or allowing you to
            act on behalf of the estate, including one of: Grant of
            Representation, the Will, or a signed engagement letter
          </li>
          <li>Copy of your passport</li>
          <li>Proof of address, such as a utility bill or bank statement</li>
        </ul>
      </div>

      <div
        className={`mt-6 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragActive
            ? "border-brand-gold bg-brand-ivory"
            : "border-brand-border bg-stone-50"
        } ${disabled ? "opacity-60" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) {
            setDragActive(true);
          }
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setDragActive(false);

          if (!disabled) {
            appendFiles(event.dataTransfer.files);
          }
        }}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-navy text-brand-gold-light">
          <DocumentIcon className="h-6 w-6" />
        </div>
        <p className="mt-5 font-serif text-2xl font-semibold text-brand-navy">
          Secure document upload
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-brand-slate">
          Drag files here or select them manually. Accepted file types: PDF,
          JPG, and PNG. Maximum size is 10MB per file.
        </p>

        <input
          ref={inputRef}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          disabled={disabled}
          multiple
          type="file"
          onChange={(event) => appendFiles(event.target.files)}
        />
        <button
          type="button"
          className="mt-6 inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Select files
        </button>
        <p className="mt-4 text-xs uppercase tracking-[0.12em] text-brand-slate/72">
          {acceptedTypesSummary}
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {files.length > 0 ? (
        <div className="mt-6 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              className="flex items-start justify-between gap-4 rounded-xl border border-brand-border bg-white px-4 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-brand-navy">
                  {file.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-brand-slate">
                  {file.type || "Unknown type"} · {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-brand-border text-brand-slate hover:border-brand-gold hover:text-brand-navy"
                onClick={() => removeFile(index)}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
