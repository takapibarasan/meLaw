import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  ContentsCertifiedMailCommon,
  ContentsCertifiedMailSNS,
  ContentsCertifiedMailInformation,
  ContentsCertifiedMailSalary,
  ContentsCertifiedMailTradingValue,
  ContentsCertifiedMailSecurityDeposit,
  ContentsCertifiedMailTrafficAccident,
  ContentsCertifiedMailLendMoney,
  blankContentsCertifiedMailCommon,
  blankContentsCertifiedMailSNS,
  blankContentsCertifiedMailInformation,
  blankContentsCertifiedMailSalary,
  blankContentsCertifiedMailTradingValue,
  blankContentsCertifiedMailSecurityDeposit,
  blankContentsCertifiedMailTrafficAccident,
  blankContentsCertifiedMailLendMoney,
} from './contents-certified-mail';

export type ComplaintCommon = ContentsCertifiedMailCommon & {
  lawsuitCount: string;
  courtName: string;
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

export type ComplaintSNS = ContentsCertifiedMailSNS & {
  execute: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  existsEvidence: boolean;
  existsDisclosureDocument: boolean;
  existsProviderDocument: boolean;
  providerName: string;
  accountName: string;
  isTargetAccount: boolean;
  existsPosts: boolean;
};

export type ComplaintInformation = ContentsCertifiedMailInformation & {
  execute: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  contentsCertificatedMailDate: firebase.firestore.Timestamp | null;
  existsContract: boolean;
  existsReceipt: boolean;
  existsEmail: boolean;
  existsTranscriptCopy: boolean;
  existsScreenShot: boolean;
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
  workEndDate: firebase.firestore.Timestamp | null;
  reference: string;
  existsStatement: boolean;
  existsCertificate: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
};

export type ComplaintTradingValue = ContentsCertifiedMailTradingValue & {
  execute: boolean;
  existsInvoice: boolean;
  existsDeliveryNote: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
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
  contractDate: firebase.firestore.Timestamp | null;
  leasePeriod: string;
  contractEndDate: firebase.firestore.Timestamp | null;
  agreement: string;
  reference: string;
  existsCertificate: boolean;
  existsDeliveryCertificate: boolean;
  existsContentsCertifiedMail: boolean;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
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
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
};

export type ComplaintLendMoney = ContentsCertifiedMailLendMoney & {
  execute: boolean;
  interest: string;
  interestStartDate: firebase.firestore.Timestamp | null;
  interestEndDate: firebase.firestore.Timestamp | null;
  agreement: string;
  reference: string;
  existsContract: boolean;
  existsCertificate: boolean;
  existsAcknowledgement: boolean;
  existsMemorandum: boolean;
  partialReturnDate: firebase.firestore.Timestamp | null;
};

export const blankComplaintCommon: ComplaintCommon = {
  ...blankContentsCertifiedMailCommon,
  lawsuitCount: '1',
  courtName: '',
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

export const blankComplaintSNS: ComplaintSNS = {
  ...blankContentsCertifiedMailSNS,
  execute: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: null,
  existsEvidence: false,
  existsDisclosureDocument: false,
  existsProviderDocument: false,
  providerName: '',
  accountName: '',
  isTargetAccount: false,
  existsPosts: false,
};

export const blankComplaintInformation: ComplaintInformation = {
  ...blankContentsCertifiedMailInformation,
  execute: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: null,
  contentsCertificatedMailDate: null,
  existsContract: false,
  existsReceipt: false,
  existsEmail: false,
  existsTranscriptCopy: false,
  existsScreenShot: false,
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
  workEndDate: null,
  reference: '',
  existsStatement: false,
  existsCertificate: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: null,
};

export const blankComplaintTradingValue: ComplaintTradingValue = {
  ...blankContentsCertifiedMailTradingValue,
  execute: false,
  existsInvoice: false,
  existsDeliveryNote: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: null,
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
  contractDate: null,
  leasePeriod: '',
  contractEndDate: null,
  agreement: '',
  reference: '',
  existsCertificate: false,
  existsDeliveryCertificate: false,
  existsContentsCertifiedMail: false,
  existsDelayPayment: false,
  delayPayment: '',
  delayPaymentStartType: 1,
  delayPaymentStartDate: null,
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
  delayPaymentStartDate: null,
};

export const blankComplaintLendMoney: ComplaintLendMoney = {
  ...blankContentsCertifiedMailLendMoney,
  execute: false,
  interest: '',
  interestStartDate: null,
  interestEndDate: null,
  agreement: '',
  reference: '',
  existsContract: false,
  existsCertificate: false,
  existsAcknowledgement: false,
  existsMemorandum: false,
  partialReturnDate: null,
};
