
import { atom } from 'recoil';

export const registerAtom = atom({
  key: 'registerAtom',
  default: {
    name: undefined,
    password: undefined,
    email: undefined,
  }
});