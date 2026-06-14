"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  solicitorEnquiryFormSchema,
  type SolicitorEnquiryFormData,
} from "@/app/lib/validation";

const inputClassName =
  "w-full border border-brand-border bg-white px-4 py-3 text-[1rem] text-brand-ink outline-none transition focus:border-brand-gold";

const enquiryTypes = [
  "Standard Estate Search",
  "Asset & Liability Estate Search",
  "International Estate Search",
  "High Net Worth & Bespoke International Estate Search",
] as const;

const contactMethods = ["Email", "Telephone"] as const;

export function SolicitorEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SolicitorEnquiryFormData>({
    resolver: zodResolver(solicitorEnquiryFormSchema),
  });

  async function onSubmit(values: SolicitorEnquiryFormData) {
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/send-solicitor-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        message?: string;
        success: boolean;
      };

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message ||
            "We could not send your professional enquiry right now. Please try again.",
        );
      }

      reset();
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your professional enquiry right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-name"
          >
            Name
          </label>
          <input
            id="solicitor-name"
            className={inputClassName}
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-red-700">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-company"
          >
            Company / Firm Name
          </label>
          <input
            id="solicitor-company"
            className={inputClassName}
            {...register("company")}
          />
          {errors.company ? (
            <p className="mt-2 text-sm text-red-700">{errors.company.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-role"
          >
            Position / Role
          </label>
          <input
            id="solicitor-role"
            className={inputClassName}
            {...register("role")}
          />
          {errors.role ? (
            <p className="mt-2 text-sm text-red-700">{errors.role.message}</p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-email"
          >
            Email Address
          </label>
          <input
            id="solicitor-email"
            type="email"
            className={inputClassName}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-phone"
          >
            Telephone Number
          </label>
          <input
            id="solicitor-phone"
            type="tel"
            className={inputClassName}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-red-700">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-brand-navy"
            htmlFor="solicitor-contact-method"
          >
            Preferred Contact Method
          </label>
          <select
            id="solicitor-contact-method"
            className={inputClassName}
            defaultValue=""
            {...register("preferredContactMethod")}
          >
            <option value="" disabled>
              Select an option
            </option>
            {contactMethods.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.preferredContactMethod ? (
            <p className="mt-2 text-sm text-red-700">
              {errors.preferredContactMethod.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-brand-navy"
          htmlFor="solicitor-enquiry-type"
        >
          Type of Enquiry
        </label>
        <select
          id="solicitor-enquiry-type"
          className={inputClassName}
          defaultValue=""
          {...register("enquiryType")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {enquiryTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.enquiryType ? (
          <p className="mt-2 text-sm text-red-700">
            {errors.enquiryType.message}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-brand-navy"
          htmlFor="solicitor-estate-details"
        >
          Brief Details of the Estate or Search Required
        </label>
        <textarea
          id="solicitor-estate-details"
          rows={6}
          className={inputClassName}
          {...register("estateDetails")}
        />
        {errors.estateDetails ? (
          <p className="mt-2 text-sm text-red-700">
            {errors.estateDetails.message}
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {isSubmitted ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Thank you. Your professional enquiry has been sent and we will respond
          within two working days.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Start a Professional Enquiry"}
      </button>
    </form>
  );
}
