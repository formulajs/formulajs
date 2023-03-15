export class FormulasError extends Error {
  constructor(message) {
    super(message)

    this.formulaError = true
  }
}
