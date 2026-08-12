"use client";

import { useCallback, useRef, useState } from "react";
import { trackGenieEnquirySubmit } from "@/lib/analytics/track";
import type { GenieEnquiryType } from "@/config/genie-enquiry";
import {
  EMPTY_ENQUIRY_FORM,
  type GenieEnquiryFormState,
} from "@/components/genie/GenieEnquiryForm";
import {
  GenieEnquiryRequestError,
  submitGenieEnquiry,
} from "@/lib/genie/enquiry-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateClientForm(
  enquiryType: GenieEnquiryType,
  values: GenieEnquiryFormState,
): Partial<Record<keyof GenieEnquiryFormState, string>> {
  const errors: Partial<Record<keyof GenieEnquiryFormState, string>> = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (
    (enquiryType === "sales" || enquiryType === "callback") &&
    !values.company.trim()
  ) {
    errors.company = "Company is required.";
  }

  if (enquiryType === "callback" && !values.phone.trim()) {
    errors.phone = "Phone is required for callback requests.";
  }

  return errors;
}

export function useGenieEnquiry() {
  const [enquiryType, setEnquiryType] = useState<GenieEnquiryType | null>(null);
  const [successEnquiryType, setSuccessEnquiryType] = useState<GenieEnquiryType | null>(
    null,
  );
  const [formValues, setFormValues] = useState<GenieEnquiryFormState>(EMPTY_ENQUIRY_FORM);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof GenieEnquiryFormState, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  const openEnquiry = useCallback((type: GenieEnquiryType) => {
    setEnquiryType(type);
    setFieldErrors({});
    setFormError(null);
    setSuccessEnquiryType(null);
  }, []);

  const closeEnquiry = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setEnquiryType(null);
    setFieldErrors({});
    setFormError(null);
  }, [isSubmitting]);

  const resetEnquiry = useCallback(() => {
    submitLockRef.current = false;
    setEnquiryType(null);
    setSuccessEnquiryType(null);
    setFormValues(EMPTY_ENQUIRY_FORM);
    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(false);
  }, []);

  const updateField = useCallback(
    (field: keyof GenieEnquiryFormState, value: string) => {
      setFormValues((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }
        const next = { ...current };
        delete next[field];
        return next;
      });
      setFormError(null);
    },
    [],
  );

  const submitEnquiry = useCallback(async () => {
    if (!enquiryType || isSubmitting || submitLockRef.current) {
      return;
    }

    const clientErrors = validateClientForm(enquiryType, formValues);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setFormError(null);

    const submittedType = enquiryType;

    try {
      await submitGenieEnquiry(submittedType, formValues);
      setSuccessEnquiryType(submittedType);
      setEnquiryType(null);
      trackGenieEnquirySubmit({
        enquiryType: submittedType,
        outcome: "success",
      });
    } catch (error) {
      const message =
        error instanceof GenieEnquiryRequestError
          ? error.message
          : "We couldn't submit your request right now. Please try again.";

      setFormError(message);
      trackGenieEnquirySubmit({
        enquiryType: submittedType,
        outcome: "error",
        errorCode:
          error instanceof GenieEnquiryRequestError ? error.code : "enquiry_failed",
      });
      submitLockRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  }, [enquiryType, formValues, isSubmitting]);

  return {
    enquiryType,
    successEnquiryType,
    formValues,
    fieldErrors,
    formError,
    isSubmitting,
    openEnquiry,
    closeEnquiry,
    resetEnquiry,
    updateField,
    submitEnquiry,
  };
}
