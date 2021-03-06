
import { atom } from 'recoil';

export const insertVdoAtom = atom({
  key: 'insertVdoAtom',
  default: {
    subject: undefined,
    vdoName: undefined,
    description: undefined,
    src: undefined,
    detail: undefined,
  }
});