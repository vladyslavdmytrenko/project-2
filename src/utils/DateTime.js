import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from 'constant';

export const timestampToDateTime = (value) =>
  moment(+value).format('DD/MM/YYYY LTS');

export const timestampToMoment = (value) => moment(+value);

export const timestampToDate = (value) => moment(+value).format('DD/MM/YYYY');

export const timestampToTime = (value) => moment(+value).format('HH:MM');

export const dateTimeToTimestamp = (data, time) =>
  moment(`${data.format(DATE_FORMAT)} ${time.format(TIME_FORMAT)}`).format('x');
