import firebase from 'firebase/app';
import 'firebase/firestore';

export type LetterSNS = {
  caseId: string;
  type: number;
  user: string | undefined;
  name: string;
  lawOffice: string;
  lawyerName: string;
  possibleDate: firebase.firestore.Timestamp | null;
  possibleDateHour: string;
  possibleDateMinute: string;
  possibleDateHour2: string;
  possibleDateMinute2: string;
  possibleDate2: firebase.firestore.Timestamp | null;
  possibleDate2Hour: string;
  possibleDate2Minute: string;
  possibleDate2Hour2: string;
  possibleDate2Minute2: string;
  possibleDate3: firebase.firestore.Timestamp | null;
  possibleDate3Hour: string;
  possibleDate3Minute: string;
  possibleDate3Hour2: string;
  possibleDate3Minute2: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankLetterSNS: LetterSNS = {
  caseId: '',
  type: 1,
  user: '',
  name: '',
  lawOffice: '',
  lawyerName: '',
  possibleDate: null,
  possibleDateHour: '',
  possibleDateMinute: '',
  possibleDateHour2: '',
  possibleDateMinute2: '',
  possibleDate2: null,
  possibleDate2Hour: '',
  possibleDate2Minute: '',
  possibleDate2Hour2: '',
  possibleDate2Minute2: '',
  possibleDate3: null,
  possibleDate3Hour: '',
  possibleDate3Minute: '',
  possibleDate3Hour2: '',
  possibleDate3Minute2: '',
  createdAt: null,
  updatedAt: null,
};
