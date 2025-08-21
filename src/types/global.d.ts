
export {};

declare global {
  interface Window {
    confirmationResult?: any; // Replace 'any' with the actual type if known
    recaptchaVerifier?: any;
  }
}