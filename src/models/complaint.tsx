import {
  ContentsCertifiedMailCommon,
  ContentsCertifiedMailInformation,
  ContentsCertifiedMailSalary,
  ContentsCertifiedMailTradingValue,
  ContentsCertifiedMailSecurityDeposit,
  ContentsCertifiedMailTrafficAccident,
  ContentsCertifiedMailLendMoney,
  blankContentsCertifiedMailCommon,
  blankContentsCertifiedMailInformation,
  blankContentsCertifiedMailSalary,
  blankContentsCertifiedMailTradingValue,
  blankContentsCertifiedMailSecurityDeposit,
  blankContentsCertifiedMailTrafficAccident,
  blankContentsCertifiedMailLendMoney,
} from './contents-certified-mail';

export type ComplaintCommon = ContentsCertifiedMailCommon & {
  lawsuitCount: number;
  phoneNumber: string;
  mailingType: number;
  mailingDescription: string;
  mailingCompany: string;
  mailingPostCode: string;
  mailingPrefecture: string;
  mailingCity: string;
  mailingBuilding: string;
  mailingPhoneNumber: string;
  recipientType: number;
  recipientName: string;
  oppositePhoneNumber: string;
  opposite2BusinessType: number;
  opposite2Name: string;
  opposite2PostCode: string;
  opposite2Prefecture: string;
  opposite2City: string;
  opposite2Building: string;
  opposite2Company: string;
  opposite2Position: string;
  opposite2PhoneNumber: string;
};

export type ComplaintInformation = ContentsCertifiedMailInformation & {
  execute: boolean;
  interest: string;
  interestStartDate: Date;
  interestEndDate: Date;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
};

export type ComplaintSalary = ContentsCertifiedMailSalary & {
  execute: boolean;
  business: string;
  job: string;
  salaryType: number;
  salaryAmount: string;
  paymentDueDay: string;
  closingMonth: string;
  closingDay: string;
  workEndDate: Date;
  reference: string;
  existsStatement: boolean;
  existsCertificate: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
};

export type ComplaintTradingValue = ContentsCertifiedMailTradingValue & {
  execute: boolean;
  existsInvoice: boolean;
  existsDeliveryNote: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
  business: string;
  reference: string;
  existsContract: boolean;
  existsCertificate: boolean;
  existsReceipt: boolean;
};

export type ComplaintSecurityDeposit = ContentsCertifiedMailSecurityDeposit & {
  execute: boolean;
  existsContract: boolean;
  existsReceipt: boolean;
  contractDate: Date;
  leasePeriod: string;
  contractEndDate: Date;
  agreement: string;
  reference: string;
  existsCertificate: boolean;
  existsDeliveryCertificate: boolean;
  existsContentsCertifiedMail: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
};

export type ComplaintTrafficAccident = ContentsCertifiedMailTrafficAccident & {
  execute: boolean;
  accidentDescription: string;
  isEmployer: boolean;
  reference: string;
  existsMemorandum: boolean;
  existsReceipt: boolean;
  existsCertificate: boolean;
  existsAccidentCertificate: boolean;
  existsPhoto: boolean;
  existsEstimate: boolean;
  existsDiagram: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
};

export type ComplaintLendMoney = ContentsCertifiedMailLendMoney & {
  execute: boolean;
  interest: string;
  interestStartDate: Date;
  interestEndDate: Date;
  agreement: string;
  reference: string;
  existsContract: boolean;
  existsCertificate: boolean;
  existsAcknowledgement: boolean;
  existsMemorandum: boolean;
};

export const blankComplaintCommon: ComplaintCommon = {
  ...blankContentsCertifiedMailCommon,
  lawsuitCount: 1,
  phoneNumber: '',
  mailingType: 1,
  mailingDescription: '',
  mailingCompany: '',
  mailingPostCode: '',
  mailingPrefecture: '',
  mailingCity: '',
  mailingBuilding: '',
  mailingPhoneNumber: '',
  recipientType: 1,
  recipientName: '',
  oppositePhoneNumber: '',
  opposite2BusinessType: 1,
  opposite2Name: '',
  opposite2PostCode: '',
  opposite2Prefecture: '',
  opposite2City: '',
  opposite2Building: '',
  opposite2Company: '',
  opposite2Position: '',
  opposite2PhoneNumber: '',
};

export const blankComplaintInformation: ComplaintInformation = {
  ...blankContentsCertifiedMailInformation,
  execute: false,
  interest: '',
  interestStartDate: new Date(),
  interestEndDate: new Date(),
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: new Date(),
};

export const blankComplaintSalary: ComplaintSalary = {
  ...blankContentsCertifiedMailSalary,
  execute: false,
  business: '',
  job: '',
  salaryType: 1,
  salaryAmount: '',
  paymentDueDay: '',
  closingMonth: '',
  closingDay: '',
  workEndDate: new Date(),
  reference: '',
  existsStatement: false,
  existsCertificate: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: new Date(),
};

export const blankComplaintTradingValue: ComplaintTradingValue = {
  ...blankContentsCertifiedMailTradingValue,
  execute: false,
  existsInvoice: false,
  existsDeliveryNote: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: new Date(),
  business: '',
  reference: '',
  existsContract: false,
  existsCertificate: false,
  existsReceipt: false,
};

export const blankComplaintSecurityDeposit: ComplaintSecurityDeposit = {
  ...blankContentsCertifiedMailSecurityDeposit,
  execute: false,
  existsContract: false,
  existsReceipt: false,
  contractDate: new Date(),
  leasePeriod: '',
  contractEndDate: new Date(),
  agreement: '',
  reference: '',
  existsCertificate: false,
  existsDeliveryCertificate: false,
  existsContentsCertifiedMail: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: new Date(),
};

export const blankComplaintTrafficAccident: ComplaintTrafficAccident = {
  ...blankContentsCertifiedMailTrafficAccident,
  execute: false,
  accidentDescription: '',
  isEmployer: false,
  reference: '',
  existsMemorandum: false,
  existsReceipt: false,
  existsCertificate: false,
  existsAccidentCertificate: false,
  existsPhoto: false,
  existsEstimate: false,
  existsDiagram: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: new Date(),
};

export const blankComplaintLendMoney: ComplaintLendMoney = {
  ...blankContentsCertifiedMailLendMoney,
  execute: false,
  interest: '',
  interestStartDate: new Date(),
  interestEndDate: new Date(),
  agreement: '',
  reference: '',
  existsContract: false,
  existsCertificate: false,
  existsAcknowledgement: false,
  existsMemorandum: false,
};
