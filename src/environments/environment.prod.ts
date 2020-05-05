import { configFirebase } from '@env/configFirebase';
import { configPHP } from '@env/configPHP';

export const environment = {
  appVersion: '3.0.1',
  production: true,
  firebase: configFirebase,
  configPHP
};
