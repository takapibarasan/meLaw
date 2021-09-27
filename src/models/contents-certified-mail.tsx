import firebase from 'firebase/app';

export type ContentsCertifiedMailCommon = {
  id?: string;
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

export type ContentsCertifiedMailInformation = {
  salesDate: Date; // 情報商材、売買代金請求
  salesAmount: string; // 情報商材、売買代金請求
  informationCompany: string; // 情報商材
  service: string; // 情報商材
  coolingOffType: number; // 情報商材
};

export type ContentsCertifiedMailSalary = {
  workStartDate: Date; // 未払いの給料請求
  unpaidSalaryStartDate: Date; // 未払いの給料請求
  unpaidSalaryEndDate: Date; // 未払いの給料請求
  unpaidSalary: string; // 未払いの給料請求
};

export type ContentsCertifiedMailTradingValue = {
  salesDate: Date; // 情報商材、売買代金請求
  salesAmount: string; // 情報商材、売買代金請求
  product: string; // 売買代金請求
  paymentDueDate: Date; // 売買代金請求
  paidAmount: string; // 売買代金請求
};

export type ContentsCertifiedMailSecurityDeposit = {
  rentPostCode: string; // 敷金返還請求
  rentPrefecture: string; // 敷金返還請求
  rentCity: string; // 敷金返還請求
  rentBuilding: string; // 敷金返還請求
  rent: string; // 敷金返還請求
  expenses: string; // 敷金返還請求
  leavingDate: Date; // 敷金返還請求
  depositAmount: string; // 敷金返還請求
};

export type ContentsCertifiedMailTrafficAccident = {
  accidentDate: Date; // 損害賠償(交通事故による物損)請求
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
  loanDate: Date; // 貸金返還請求
  existsReturnDate: boolean; // 貸金返還請求
  returnDate: Date; // 貸金返還請求
  interest: string; // 貸金返還請求
  returnAmount: string; // 貸金返還請求
  existsDelayPayment: boolean; // 貸金返還請求
  delayPayment: string; // 貸金返還請求
};

export const blankContentsCertifiedMailCommon: ContentsCertifiedMailCommon = {
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

export const blankContentsCertifiedMailInformation: ContentsCertifiedMailInformation =
  {
    salesDate: new Date(),
    salesAmount: '',
    informationCompany: '',
    service: '',
    coolingOffType: 1,
  };

export const blankContentsCertifiedMailSalary: ContentsCertifiedMailSalary = {
  workStartDate: new Date(),
  unpaidSalaryStartDate: new Date(),
  unpaidSalaryEndDate: new Date(),
  unpaidSalary: '',
};

export const blankContentsCertifiedMailTradingValue: ContentsCertifiedMailTradingValue =
  {
    salesDate: new Date(),
    salesAmount: '',
    product: '',
    paymentDueDate: new Date(),
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
    leavingDate: new Date(),
    depositAmount: '',
  };

export const blankContentsCertifiedMailTrafficAccident: ContentsCertifiedMailTrafficAccident =
  {
    accidentDate: new Date(),
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
    loanDate: new Date(),
    existsReturnDate: false,
    returnDate: new Date(),
    interest: '',
    returnAmount: '',
    existsDelayPayment: false,
    delayPayment: '',
  };
