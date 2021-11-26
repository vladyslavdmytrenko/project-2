import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from 'constant';

export const timestampToDate = (value) =>
  moment.unix(value / 1000).format('DD/MM/YYYY LTS');

export const dateTimeToTimestamp = (data, time) =>
  moment(`${data.format(DATE_FORMAT)} ${time.format(TIME_FORMAT)}`).format('x');
