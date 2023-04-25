import firebase from 'firebase/app';
import 'firebase/firestore';

export type InjunctionSNS = {
  caseId: string;
  type: number;
  user: string | undefined;
  name: string;
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
  phoneNumber: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankInjunctionSNS: InjunctionSNS = {
  caseId: '',
  type: 1,
  user: '',
  name: '',
  postCode: '',
  prefecture: '',
  city: '',
  building: '',
  phoneNumber: '',
  createdAt: null,
  updatedAt: null,
};
