import firebase from 'firebase/app';
import 'firebase/firestore';

export type AccessLogPreventationRequestSNS = {
  caseId: string;
  type: number;
  user: string | undefined;
  name: string;
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
  phoneNumber: string;
  providerName: string;
  providerPostCode: string;
  providerPrefecture: string;
  providerCity: string;
  providerBuilding: string;
  providerDepartment: string;
  url: string;
  accountId: string;
  postedDate: firebase.firestore.Timestamp | null;
  postedHour: string;
  postedMinute: string;
  loginDate: firebase.firestore.Timestamp | null;
  ipAddress: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankAccessLogPreventationRequestSNS: AccessLogPreventationRequestSNS =
  {
    caseId: '',
    type: 1,
    user: '',
    name: '',
    postCode: '',
    prefecture: '',
    city: '',
    building: '',
    phoneNumber: '',
    providerName: '',
    providerPostCode: '',
    providerPrefecture: '',
    providerCity: '',
    providerBuilding: '',
    providerDepartment: '',
    url: '',
    accountId: '',
    postedDate: null,
    postedHour: '',
    postedMinute: '',
    loginDate: null,
    ipAddress: '',
    createdAt: null,
    updatedAt: null,
  };
