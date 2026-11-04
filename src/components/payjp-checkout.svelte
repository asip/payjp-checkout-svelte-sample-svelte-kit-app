<script module lang="ts">
  interface PayjpCheckoutResponse {
    // card: any
    // created: number
    id: string;
    // livemode: boolean
    // object: string
    // used: boolean
  }

  interface PayjpCheckoutErrorResponse {
    // code: string
    message: string;
    // status: number // http (response) status code
    // type: string
  }

  interface DataProperties {
    key: string,
    partial?: string,
    text?: string,
    submitText?: string,
    tokenName?: string,
    previousToken?: string,
    lang?: string,
    namePlaceholder?: string,
    tenant?: string,
  }

  declare global {
    interface Window {
      payjpCheckoutOnCreated: ((response: PayjpCheckoutResponse) => void) | null

      payjpCheckoutOnFailed:
        | ((statusCode: number, errorResponse: PayjpCheckoutErrorResponse) => void)
        | null

      PayjpCheckout: unknown | null
    }
  }
</script>

<script lang="ts">
  import type {
    PayjpCheckoutPayload,
    PayjpCheckoutErrorPayload,
  } from '#lib'

  interface PayjpCheckoutProps {
    data: DataProperties,
    onCreatedHandler: (payload: PayjpCheckoutPayload) => void,
    onFailedHandler: (payload: PayjpCheckoutErrorPayload) => void
  }

  let {
    data,
    onCreatedHandler,
    onFailedHandler
  }: PayjpCheckoutProps = $props();

  const payjpCheckoutId = $props.id();

  const handleCheckoutCreated = (response: PayjpCheckoutResponse) => {
    const payload: PayjpCheckoutPayload = { token: response.id };
    onCreatedHandler(payload);
  };

  const handleCheckoutFailed = (statusCode: number, errorResponse: PayjpCheckoutErrorResponse) => {
    const payload: PayjpCheckoutErrorPayload = { statusCode, message: errorResponse.message };
    onFailedHandler(payload);
  };

  $effect(() => {
    window.payjpCheckoutOnCreated = handleCheckoutCreated;
    window.payjpCheckoutOnFailed = handleCheckoutFailed;
    /*
    PAY.JP の checkout から呼ばれる window.alert を無効化
    // カード情報が不正のときに window.alert が payjp の checkout から呼ばれるため
    window.alert = () => {};
    */

    const script = document.createElement('script');
    script.src = 'https://checkout.pay.jp/';
    script.classList.add('payjp-button');
    script.dataset.onCreated = 'payjpCheckoutOnCreated';
    script.dataset.onFailed = 'payjpCheckoutOnFailed';
    script.dataset.key = data.key;
    script.dataset.partial = data.partial ?? 'false';
    if (data.text) script.dataset.text = data.text;
    if (data.submitText) script.dataset.submitText = data.submitText;
    if (data.tokenName) script.dataset.tokenName = data.tokenName;
    if (data.previousToken) script.dataset.previousToken = data.previousToken;
    if (data.lang) script.dataset.lang = data.lang;
    if (data.namePlaceholder) script.dataset.namePlaceholder = data.namePlaceholder;
    if (data.tenant) script.dataset.tenant = data.tenant;

    const element = document.querySelector(`#${payjpCheckoutId}`);
    element?.appendChild(script);

    return () => {
      element?.removeChild(script as Node);
      window.payjpCheckoutOnCreated = null;
      window.payjpCheckoutOnFailed = null;
      window.PayjpCheckout = null;
    };
  });
</script>

<div id={payjpCheckoutId}></div>
