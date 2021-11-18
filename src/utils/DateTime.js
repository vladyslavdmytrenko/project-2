import moment from 'moment';

export const timestampToDate = (value) =>
  moment.unix(value / 1000).format('MM/DD/YYYY LTS');
