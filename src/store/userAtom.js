
import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    LOGIN_STATUS: undefined,
    ACCESS_TOKEN: undefined,
    USER_LEVEL: undefined,
    USER_NAME: undefined,
  }
});