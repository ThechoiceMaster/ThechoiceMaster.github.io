
import { atom } from 'recoil';

export const insertSubject = atom({
  key: 'insertSubject',
  default: {
    subject: undefined,
    description: undefined,
  }
});