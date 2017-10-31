export const regexExpression: Object = {
  ONLY_NUMBERS: '[0-9]{1,3}',
  ONLY_ALPHANUMERIC: '[a-zA-Z0-9]+$',
  INPUT_REGEX: '[\ a-zA-Z0-9-_.,:#+/&()]+$',
  LINKING: /[^a-zA-Z0-9]/g,
  MAX_LENGTH_INPUT: '20',
  MIN_LENGTH_PASSWORD: '6',
  MAX_LENGTH_TEXTAREA: '250',
  EMAIL_REGEX: new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
  '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
  '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
  '[a-zA-Z]{2,}))$'].join(''))
};
