import moment from 'moment';
import * as yup from 'yup';

import { DATE_FORMAT } from 'constant';

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),

  secondName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),

  appointmentDate: yup
    .string()
    .nullable()
    .required('Required')
    .test(
      'dateTest',
      'Invalid date',
      (value) =>
        moment(value).format(DATE_FORMAT) >
        moment(Date.now()).format(DATE_FORMAT)
    ),

  appointmentTime: yup.string().nullable().required('Required'),

  phoneNumber: yup
    .string()
    .matches(/\(\d{3}\)-\d{3}-\d{4}/g, 'Phone number is not valid')
    .required('Required'),

  notes: yup.string().max(1000, 'Maximum is 1000 characters'),

  department: yup.string().ensure().required('Department required'),
});
