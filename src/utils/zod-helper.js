import { z } from 'zod';

const dateStringToTimestamp = (val) => {
  const [dd, mm, yyyy] = val.split('/');
  const date = new Date(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`);
  const timestamp = date.getTime();
  return isNaN(timestamp) ? NaN : Math.floor(timestamp / 1000);
};

/**
 * Accepts either a UNIX timestamp number or a DD/MM/YYYY string,
 * and always returns a nonnegative integer timestamp.
 */
export const dateOrTimestamp = z.preprocess(
  (val) =>
    typeof val === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val)
      ? dateStringToTimestamp(val)
      : val,
  z.number({ invalid_type_error: 'Date must be a valid DD/MM/YYYY or timestamp' }).int('Date must be an integer timestamp').nonnegative('Date must be a nonnegative timestamp').refine((n) => !isNaN(n), { message: 'Invalid date format or value: expected DD/MM/YYYY' })
);
