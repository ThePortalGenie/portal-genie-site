export type DemoLeadPayload = {
  firstName: string;
  surname: string;
  company: string;
  phone: string;
  email: string;
  accountingSoftware: string;
  otherAccountingSoftware?: string;
};

export type DemoVerificationRecord = DemoLeadPayload & {
  createdAt: string;
  status: "pending";
};

export type DemoSessionRecord = {
  verified: true;
  email: string;
  firstName: string;
  createdAt: string;
};

export type ValidatedDemoLeadRequest = DemoLeadPayload;
