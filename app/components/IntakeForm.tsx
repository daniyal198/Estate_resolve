"use client";

import { useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentUpload } from "@/app/components/DocumentUpload";
import {
  intakeFormSchema,
  type IntakeFormData,
} from "@/app/lib/validation";
import { createCaseReference } from "@/app/lib/email-templates";

const inputClassName =
  "w-full border border-brand-border bg-white px-4 py-3 text-[1rem] text-brand-ink outline-none transition focus:border-brand-gold";
const checkboxClassName =
  "mt-1 h-4 w-4 shrink-0 rounded border-brand-border text-brand-navy focus:ring-brand-gold";

const relationshipOptions = [
  "Executor",
  "Administrator",
  "Next of Kin",
  "Solicitor",
  "Other Representative",
] as const;

function getTodayDateInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type CheckoutSessionResponse = {
  message?: string;
  sessionId?: string;
  success: boolean;
  url?: string;
};

export function IntakeForm() {
  const todayDateInputValue = getTodayDateInputValue();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
  });

  async function onSubmit(values: IntakeFormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError(null);

    try {
      const pendingCaseReference = createCaseReference();
      const uploadedFiles: string[] = [];

      if (files.length > 0) {
        for (const [index, file] of files.entries()) {
          setSubmitStatus(`Uploading document ${index + 1} of ${files.length}...`);

          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          uploadFormData.append("caseReference", pendingCaseReference);

          let uploadResponse: Response;

          try {
            uploadResponse = await fetch("/api/upload", {
              method: "POST",
              body: uploadFormData,
            });
          } catch {
            throw new Error(
              `Could not reach the upload service while uploading "${file.name}". Please try again.`,
            );
          }

          const uploadPayload = (await uploadResponse.json()) as {
            error?: string;
            url?: string;
          };

          if (!uploadResponse.ok || !uploadPayload.url) {
            throw new Error(
              uploadPayload.error ||
                `Document upload failed for "${file.name}". Please try again.`,
            );
          }

          uploadedFiles.push(uploadPayload.url);
        }
      }

      setSubmitStatus("Preparing secure payment...");

      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          caseReference: pendingCaseReference,
          uploadedFiles,
        }),
      });

      const checkoutPayload =
        (await checkoutResponse.json()) as CheckoutSessionResponse;

      if (!checkoutResponse.ok || !checkoutPayload.success || !checkoutPayload.url) {
        throw new Error(
          checkoutPayload.message ||
            "We could not start the secure payment flow. Please try again.",
        );
      }

      setSubmitStatus("Redirecting to secure payment...");
      window.location.assign(checkoutPayload.url);
    } catch (error) {
      setSubmitStatus(null);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your case.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(onSubmit)(event);
      }}
    >
      <section className="border-b border-brand-border pb-8">
        <h2 className="font-serif text-2xl font-semibold text-brand-navy">
          Deceased person details
        </h2>
        <div className="mt-6 grid gap-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="deceasedFullName"
            >
              Full name
            </label>
            <input
              id="deceasedFullName"
              placeholder="Jane Margaret Smith"
              className={inputClassName}
              {...register("deceasedFullName")}
            />
            {errors.deceasedFullName ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.deceasedFullName.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="dateOfDeath"
              >
                Date of birth
              </label>
              <input
                id="dateOfDeath"
                type="date"
                max={todayDateInputValue}
                className={inputClassName}
                {...register("dateOfDeath")}
              />
              {errors.dateOfDeath ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.dateOfDeath.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="niNumber"
              >
                National Insurance number
              </label>
              <input
                id="niNumber"
                placeholder="Optional"
                className={inputClassName}
                {...register("niNumber")}
              />
              {errors.niNumber ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.niNumber.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border pb-8">
        <h2 className="font-serif text-2xl font-semibold text-brand-navy">
          Your details
        </h2>
        <div className="mt-6 grid gap-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="yourName"
            >
              Full name
            </label>
            <input
              id="yourName"
              placeholder="Your full name"
              className={inputClassName}
              {...register("yourName")}
            />
            {errors.yourName ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.yourName.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="yourAddress"
            >
              Address
            </label>
            <input
              id="yourAddress"
              placeholder="Your address"
              className={inputClassName}
              {...register("yourAddress")}
            />
            {errors.yourAddress ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.yourAddress.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="yourPostalCode"
              >
                Postal code
              </label>
              <input
                id="yourPostalCode"
                placeholder="WC2H 9JQ"
                className={inputClassName}
                {...register("yourPostalCode")}
              />
              {errors.yourPostalCode ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.yourPostalCode.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="yourEmail"
              >
                Email address
              </label>
              <input
                id="yourEmail"
                placeholder="name@example.com"
                type="email"
                className={inputClassName}
                {...register("yourEmail")}
              />
              {errors.yourEmail ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.yourEmail.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-brand-navy"
                htmlFor="yourPhone"
              >
                Contact number
              </label>
              <input
                id="yourPhone"
                placeholder="020 3951 5065"
                type="tel"
                className={inputClassName}
                {...register("yourPhone")}
              />
              {errors.yourPhone ? (
                <p className="mt-2 text-sm text-red-700">
                  {errors.yourPhone.message}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="relationship"
            >
              Your relationship to the estate
            </label>
            <select
              id="relationship"
              className={inputClassName}
              defaultValue=""
              {...register("relationship")}
            >
              <option value="" disabled>
                Select an option
              </option>
              {relationshipOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.relationship ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.relationship.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border pb-8">
        <h2 className="font-serif text-2xl font-semibold text-brand-navy">
          Case background
        </h2>
        <div className="mt-6 grid gap-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="knownInstitutions"
            >
              Known institutions or account clues
            </label>
            <textarea
              id="knownInstitutions"
              rows={4}
              placeholder="Optional: any known banks, pension providers, insurers, or investment firms."
              className={inputClassName}
              {...register("knownInstitutions")}
            />
            {errors.knownInstitutions ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.knownInstitutions.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-brand-navy"
              htmlFor="caseSummary"
            >
              Any additional relevant information
            </label>
            <textarea
              id="caseSummary"
              rows={6}
              placeholder="Tell us what is known so far and what you need clarified before the estate can move forward."
              className={inputClassName}
              {...register("caseSummary")}
            />
            {errors.caseSummary ? (
              <p className="mt-2 text-sm text-red-700">
                {errors.caseSummary.message}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <DocumentUpload
        disabled={!isHydrated || isSubmitting}
        files={files}
        setFiles={setFiles}
      />

      <section className="rounded-2xl border border-brand-border bg-brand-ivory p-6">
        <h2 className="font-serif text-2xl font-semibold text-brand-navy">
          Declaration and consent
        </h2>
        <div className="mt-5 space-y-4">
          <label className="flex items-start gap-3 text-sm leading-7 text-brand-slate">
            <input
              type="checkbox"
              className={checkboxClassName}
              {...register("hasAuthority")}
            />
            <span>
              I confirm that I have authority, or a legitimate basis, to submit
              this estate enquiry.
            </span>
          </label>
          {errors.hasAuthority ? (
            <p className="text-sm text-red-700">{errors.hasAuthority.message}</p>
          ) : null}

          <label className="flex items-start gap-3 text-sm leading-7 text-brand-slate">
            <input
              type="checkbox"
              className={checkboxClassName}
              {...register("consentToProcess")}
            />
            <span>
              I consent to Estate Resolve processing this information for the
              purpose of assessing and handling the enquiry in accordance with
              the privacy policy.
            </span>
          </label>
          {errors.consentToProcess ? (
            <p className="text-sm text-red-700">
              {errors.consentToProcess.message}
            </p>
          ) : null}
        </div>
      </section>

      {submitError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      {submitStatus ? (
        <div className="rounded-xl border border-brand-border bg-brand-ivory px-4 py-3 text-sm text-brand-slate">
          {submitStatus}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!isHydrated || isSubmitting}
        className="inline-flex w-full items-center justify-center border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {!isHydrated
          ? "Loading form..."
          : isSubmitting
            ? "Preparing payment..."
            : "Continue to secure payment"}
      </button>
    </form>
  );
}
