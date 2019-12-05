import { configFirebase } from '@env/configFirebase';
import { configPHP } from '@env/configPHP';

export const environment = {
  appVersion: '2.1.0',
  production: true,
  configPHP: configPHP,
  firebase: configFirebase,
};
