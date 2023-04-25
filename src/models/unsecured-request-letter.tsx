import firebase from 'firebase/app';
import 'firebase/firestore';

export type UnsecuredRequestLetterSNS = {
  caseId: string;
  type: number;
  user: string | undefined;
  name: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankUnsecuredRequestLetterSNS: UnsecuredRequestLetterSNS = {
  caseId: '',
  type: 1,
  user: '',
  name: '',
  createdAt: null,
  updatedAt: null,
};
