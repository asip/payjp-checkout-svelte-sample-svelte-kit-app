// See https://svelte.dev/docs/kit/types#app.d.ts

import type {
  PayjpCheckoutResponse,
  PayjpCheckoutErrorResponse
} from './components/payjp-checkout.svelte';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface Window {
    payjpCheckoutOnCreated: ((response: PayjpCheckoutResponse) => void) | null;

    payjpCheckoutOnFailed:
      | ((statusCode: number, errorResponse: PayjpCheckoutErrorResponse) => void)
      | null;

    PayjpCheckout: unknown | null;
  }
}

export {};
