
import { atom } from 'recoil';

export const arrayData = atom({
  key: 'arrayData',
  default: {
    data: []
  }
});