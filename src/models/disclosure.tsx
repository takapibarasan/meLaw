import firebase from 'firebase/app';
import 'firebase/firestore';

export type DisclosureSNS = {
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
  ipAddress: string;
  publishedInformation: string;
  infringementType: number;
  infringementReason: string;
  existsDisclosureReason: boolean;
  existsDisclosureReason2: boolean;
  existsDisclosureReason3: boolean;
  existsDisclosureReason4: boolean;
  existsDisclosureReason5: boolean;
  existsDisclosureInformation: boolean;
  existsDisclosureInformation2: boolean;
  existsDisclosureInformation3: boolean;
  existsDisclosureInformation4: boolean;
  existsDisclosureInformation5: boolean;
  existsDisclosureInformation6: boolean;
  existsDisclosureInformation7: boolean;
  existsDisclosureInformation8: boolean;
  existsUndisclosureInformation: boolean;
  existsUndisclosureInformation2: boolean;
  existsUndisclosureInformation3: boolean;
  isIdentificated: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankDisclosureSNS: DisclosureSNS = {
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
  ipAddress: '',
  publishedInformation: '',
  infringementType: 1,
  infringementReason: '',
  existsDisclosureReason: false,
  existsDisclosureReason2: false,
  existsDisclosureReason3: false,
  existsDisclosureReason4: false,
  existsDisclosureReason5: false,
  existsDisclosureInformation: false,
  existsDisclosureInformation2: false,
  existsDisclosureInformation3: false,
  existsDisclosureInformation4: false,
  existsDisclosureInformation5: false,
  existsDisclosureInformation6: false,
  existsDisclosureInformation7: false,
  existsDisclosureInformation8: false,
  existsUndisclosureInformation: false,
  existsUndisclosureInformation2: false,
  existsUndisclosureInformation3: false,
  isIdentificated: false,
  createdAt: null,
  updatedAt: null,
};
