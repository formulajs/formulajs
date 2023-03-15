import { FormulasError } from './FormulasError.js'

export const nil = new FormulasError('#NULL!')
export const div0 = new FormulasError('#DIV/0!')
export const value = new FormulasError('#VALUE!')
export const ref = new FormulasError('#REF!')
export const name = new FormulasError('#NAME?')
export const num = new FormulasError('#NUM!')
export const na = new FormulasError('#N/A')
export const error = new FormulasError('#ERROR!')
export const data = new FormulasError('#GETTING_DATA')
export const calc = new FormulasError('#CALC!')
export const spill = new FormulasError('#SPILL!')
