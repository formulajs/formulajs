export const PNL_metadata = {
  n: 'PNL',
  t: 20,
  d: 'Subtract each element from A column from B column and return the total sum.',
  a: 'Returns the total of A - B element-wise subtraction across two ranges.',
  p: [
    {
      name: 'A',
      detail: 'The column or array of values to subtract from B (e.g. cost).',
      example: 'A1:A10',
      require: 'm',
      repeat: 'n',
      type: 'range'
    },
    {
      name: 'B',
      detail: 'The column or array of values to subtract A from (e.g. revenue).',
      example: 'B1:B10',
      require: 'm',
      repeat: 'n',
      type: 'range'
    }
  ]
}
