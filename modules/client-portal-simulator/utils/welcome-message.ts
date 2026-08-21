import { DEMO_CUSTOMER } from "@/modules/client-portal-simulator/data/constants";

export const WELCOME_PLACEHOLDER_FIRST_NAME = "{{ customer_first_name }}";
export const WELCOME_PLACEHOLDER_COMPANY_NAME = "{{ customer_company_name }}";

export const DEFAULT_WELCOME_MESSAGE = `Hi ${WELCOME_PLACEHOLDER_FIRST_NAME}`;

export const WELCOME_MESSAGE_PLACEHOLDERS = [
  WELCOME_PLACEHOLDER_FIRST_NAME,
  WELCOME_PLACEHOLDER_COMPANY_NAME,
] as const;

export type WelcomeMessageCustomer = {
  firstName: string;
  companyName: string;
};

export function getDemoWelcomeCustomer(): WelcomeMessageCustomer {
  return {
    firstName: DEMO_CUSTOMER.firstName,
    companyName: DEMO_CUSTOMER.companyName,
  };
}

/** Resolves supported welcome-message placeholders for portal preview. */
export function resolveWelcomeMessage(
  template: string,
  customer: WelcomeMessageCustomer,
): string {
  return template
    .replaceAll(WELCOME_PLACEHOLDER_FIRST_NAME, customer.firstName)
    .replaceAll(WELCOME_PLACEHOLDER_COMPANY_NAME, customer.companyName);
}

export function insertWelcomePlaceholder(
  currentValue: string,
  placeholder: string,
  selectionStart: number | null,
  selectionEnd: number | null,
): { value: string; cursor: number } {
  const start = selectionStart ?? currentValue.length;
  const end = selectionEnd ?? currentValue.length;
  const value = currentValue.slice(0, start) + placeholder + currentValue.slice(end);
  return { value, cursor: start + placeholder.length };
}
