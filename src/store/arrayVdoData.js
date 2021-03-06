
import { atom } from 'recoil';

export const arrayVdoData = atom({
  key: 'arrayVdoData',
  default: {
    src: undefined,
    detail: undefined,
    data: []
  }
});