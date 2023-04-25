import ContentsCertificatedMail from 'components/pages/ContentsCertificatedMail';
import firebase from 'firebase/app';
import 'firebase/firestore';

export type ContentsCertifiedMailCommon = {
  caseId: string;
  type: number;
  user: string | undefined;
  name: string; // 共通
  postCode: string; // 共通
  prefecture: string; // 共通
  city: string; // 共通
  building: string; // 共通
  company: string; // 共通
  position: string; // 共通
  businessType: number; // 共通
  oppositeName: string; // 共通
  oppositePostCode: string; // 共通
  oppositePrefecture: string; // 共通
  oppositeCity: string; // 共通
  oppositeBuilding: string; // 共通
  oppositeCompany: string; // 共通
  oppositePosition: string; // 共通
  oppositeBusinessType: number; // 共通
  dueDate: string; // 共通
  bank: string; // 共通
  branch: string; // 共通
  accountType: string; // 共通
  account: string; // 共通
  accountHolder: string; // 共通
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export type ContentsCertifiedMailSNS = {
  oppositeAccountName: string;
  slanderStartYear: string;
  slanderStartMonth: string;
  slanderEndYear: string;
  slanderEndMonth: string;
  postedDate: firebase.firestore.Timestamp | null;
  post: string;
  postedDate2: firebase.firestore.Timestamp | null;
  post2: string;
  isPointedFact: boolean;
  damageAmount: string;
};

export type ContentsCertifiedMailInformation = {
  salesDate: firebase.firestore.Timestamp | null; // 情報商材、売買代金請求
  salesAmount: string; // 情報商材、売買代金請求
  service: string; // 情報商材
  coolingOffType: number; // 情報商材
};

export type ContentsCertifiedMailSalary = {
  workStartDate: firebase.firestore.Timestamp | null; // 未払いの給料請求
  unpaidSalaryStartDate: firebase.firestore.Timestamp | null; // 未払いの給料請求
  unpaidSalaryEndDate: firebase.firestore.Timestamp | null; // 未払いの給料請求
  unpaidSalary: string; // 未払いの給料請求
};

export type ContentsCertifiedMailTradingValue = {
  salesDate: firebase.firestore.Timestamp | null; // 情報商材、売買代金請求
  salesAmount: string; // 情報商材、売買代金請求
  product: string; // 売買代金請求
  paymentDueDate: firebase.firestore.Timestamp | null; // 売買代金請求
  paidAmount: string; // 売買代金請求
};

export type ContentsCertifiedMailSecurityDeposit = {
  rentPostCode: string; // 敷金返還請求
  rentPrefecture: string; // 敷金返還請求
  rentCity: string; // 敷金返還請求
  rentBuilding: string; // 敷金返還請求
  rent: string; // 敷金返還請求
  expenses: string; // 敷金返還請求
  leavingDate: firebase.firestore.Timestamp | null; // 敷金返還請求
  depositAmount: string; // 敷金返還請求
};

export type ContentsCertifiedMailTrafficAccident = {
  accidentDate: firebase.firestore.Timestamp | null; // 損害賠償(交通事故による物損)請求
  accidentHour: string;
  accidentMinute: string;
  accidentLocation: string; // 損害賠償(交通事故による物損)請求
  vehicleType: string; // 損害賠償(交通事故による物損)請求
  oppositeVehicleType: string; // 損害賠償(交通事故による物損)請求
  accidentReason: string; // 損害賠償(交通事故による物損)請求
  repairCost: string; // 損害賠償(交通事故による物損)請求
  valuationLoss: string; // 損害賠償(交通事故による物損)請求
  rentalCost: string; // 損害賠償(交通事故による物損)請求
  replacementCost: string; // 損害賠償(交通事故による物損)請求
  registrationExpenses: string; // 損害賠償(交通事故による物損)請求
  suspensionLoss: string; // 損害賠償(交通事故による物損)請求
};

export type ContentsCertifiedMailLendMoney = {
  loanAmount: string; // 貸金返還請求
  loanDate: firebase.firestore.Timestamp | null; // 貸金返還請求
  existsReturnDate: boolean; // 貸金返還請求
  returnDate: firebase.firestore.Timestamp | null; // 貸金返還請求
  interest: string; // 貸金返還請求
  returnAmount: string; // 貸金返還請求
  existsDelayPayment: boolean; // 貸金返還請求
  delayPayment: string; // 貸金返還請求
};

export const blankContentsCertifiedMailCommon: ContentsCertifiedMailCommon = {
  caseId: '',
  type: 1,
  user: '',
  name: '',
  postCode: '',
  prefecture: '',
  city: '',
  building: '',
  company: '',
  position: '',
  businessType: 1,
  oppositeName: '',
  oppositePostCode: '',
  oppositePrefecture: '',
  oppositeCity: '',
  oppositeBuilding: '',
  oppositeCompany: '',
  oppositePosition: '',
  oppositeBusinessType: 1,
  dueDate: '',
  bank: '',
  branch: '',
  accountType: '',
  account: '',
  accountHolder: '',
  createdAt: null,
  updatedAt: null,
};

export const blankContentsCertifiedMailSNS: ContentsCertifiedMailSNS = {
  oppositeAccountName: '',
  slanderStartYear: '',
  slanderStartMonth: '',
  slanderEndYear: '',
  slanderEndMonth: '',
  postedDate: null,
  post: '',
  postedDate2: null,
  post2: '',
  isPointedFact: false,
  damageAmount: '',
};

export const blankContentsCertifiedMailInformation: ContentsCertifiedMailInformation =
  {
    salesDate: null,
    salesAmount: '',
    service: '',
    coolingOffType: 1,
  };

export const blankContentsCertifiedMailSalary: ContentsCertifiedMailSalary = {
  workStartDate: null,
  unpaidSalaryStartDate: null,
  unpaidSalaryEndDate: null,
  unpaidSalary: '',
};

export const blankContentsCertifiedMailTradingValue: ContentsCertifiedMailTradingValue =
  {
    salesDate: null,
    salesAmount: '',
    product: '',
    paymentDueDate: null,
    paidAmount: '',
  };

export const blankContentsCertifiedMailSecurityDeposit: ContentsCertifiedMailSecurityDeposit =
  {
    rentPostCode: '',
    rentPrefecture: '',
    rentCity: '',
    rentBuilding: '',
    rent: '',
    expenses: '',
    leavingDate: null,
    depositAmount: '',
  };

export const blankContentsCertifiedMailTrafficAccident: ContentsCertifiedMailTrafficAccident =
  {
    accidentDate: null,
    accidentHour: '',
    accidentMinute: '',
    accidentLocation: '',
    vehicleType: '',
    oppositeVehicleType: '',
    accidentReason: '',
    repairCost: '',
    valuationLoss: '',
    rentalCost: '',
    replacementCost: '',
    registrationExpenses: '',
    suspensionLoss: '',
  };

export const blankContentsCertifiedMailLendMoney: ContentsCertifiedMailLendMoney =
  {
    loanAmount: '',
    loanDate: null,
    existsReturnDate: false,
    returnDate: null,
    interest: '',
    returnAmount: '',
    existsDelayPayment: false,
    delayPayment: '',
  };
