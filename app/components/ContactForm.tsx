"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/app/lib/validation";

const inputClassName =
  "w-full border border-brand-border bg-white px-4 py-3 text-[1rem] text-brand-ink outline-none transition focus:border-brand-gold";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/send-contact-form", {
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
            "We could not send your message right now. Please try again.",
        );
      }

      reset();
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your message right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="mb-2 block text-sm font-semibold text-brand-navy"
          htmlFor="contact-name"
        >
          Name
        </label>
        <input
          id="contact-name"
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
          htmlFor="contact-email"
        >
          Email address
        </label>
        <input
          id="contact-email"
          type="email"
          className={inputClassName}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-brand-navy"
          htmlFor="contact-message"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className={inputClassName}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-red-700">{errors.message.message}</p>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {isSubmitted ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Thank you. Your message has been sent and a confirmation email is on
          its way.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
