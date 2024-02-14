class UserError extends Error {
  constructor(message: string) {
    super(message); // (1)
  }
}
