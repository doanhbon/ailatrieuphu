import { access_token } from '../token.json';

const config = {
  spreadsheetId: '1I8NnDxnxKMNP4E0hLmSd8PTWOrcZikL8C42DM6uytSI',
  includeValuesInResponse: true,
  insertDataOption: 'INSERT_ROWS',
  responseDateTimeRenderOption: 'SERIAL_NUMBER',
  responseValueRenderOption: 'FORMATTED_VALUE',
  valueInputOption: 'USER_ENTERED',
  access_token,
  prettyPrint: true,
  key: 'AIzaSyBKgSAqTM1ZGiJfgR3wpp7dsXdDuKtPuA8'
};

export default config;
