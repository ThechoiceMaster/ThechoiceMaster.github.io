
import { atom } from 'recoil';

export const loginAtom = atom({
  key: 'loginAtom',
  default: {
    name: undefined,
    password: undefined,
  }
});