import { configFirebase } from '@env/configFirebase';
import { configPHP } from '@env/configPHP';

export const environment = {
  appVersion: '2.0.9',
  production: true,
  configPHP: configPHP,
  firebase: configFirebase,
};
