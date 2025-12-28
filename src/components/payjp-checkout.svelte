<script lang="ts">
  interface CheckoutResponse {
    // card: any
    // created: number
    id: string;
    // livemode: boolean
    // object: string
    // used: boolean
  }

  interface CheckoutErrorResponse {
    // code: string
    message: string;
    // status: number // http (response) status code
    // type: string
  }

  interface PayjpCheckoutPayload {
    token: string;
  }

  interface PayjpCheckoutErrorPayload {
    statusCode: number;
    message: string;
  }

  let {
    dataKey,
    dataPartial,
    dataText,
    dataSubmitText,
    dataTokenName,
    dataPreviousToken,
    dataLang,
    dataNamePlaceholder,
    dataTenant,
    onCreatedHandler,
    onFailedHandler
  } = $props<{
    dataKey: string;
    dataPartial?: string;
    dataText?: string;
    dataSubmitText?: string;
    dataTokenName?: string;
    dataPreviousToken?: string;
    dataLang?: string;
    dataNamePlaceholder?: string;
    dataTenant?: string;
    onCreatedHandler: (payload: PayjpCheckoutPayload) => void;
    onFailedHandler: (payload: PayjpCheckoutErrorPayload) => void;
  }>();

  const handleCheckoutCreated = (response: CheckoutResponse) => {
    const payload: PayjpCheckoutPayload = { token: response.id };
    onCreatedHandler(payload);
  };

  const handleCheckoutFailed = (statusCode: number, errorResponse: CheckoutErrorResponse) => {
    const payload: PayjpCheckoutErrorPayload = { statusCode, message: errorResponse.message };
    onFailedHandler(payload);
  };

  $effect(() => {
    window.payjpCheckoutOnCreated = handleCheckoutCreated;
    window.payjpCheckoutOnFailed = handleCheckoutFailed;

    const script = document.createElement('script');
    script.src = 'https://checkout.pay.jp/';
    script.dataset['onCreated'] = 'payjpCheckoutOnCreated';
    script.dataset['onFailed'] = 'payjpCheckoutOnFailed';
    script.dataset['key'] = dataKey;
    script.dataset['partial'] = dataPartial || 'false';
    if (dataText) script.dataset['text'] = dataText;
    if (dataSubmitText) script.dataset['submitText'] = dataSubmitText;
    if (dataTokenName) script.dataset['tokenName'] = dataTokenName;
    if (dataPreviousToken) script.dataset['previousToken'] = dataPreviousToken;
    if (dataLang) script.dataset['lang'] = dataLang;
    if (dataNamePlaceholder) script.dataset['namePlaceholder'] = dataNamePlaceholder;
    if (dataTenant) script.dataset['tenant'] = dataTenant;
    script.classList.add('payjp-button');

    const element = document.querySelector('#payjp_dialog');
    element?.appendChild(script);

    return () => {
      element?.removeChild(script as Node);
      window.payjpCheckoutOnCreated = null;
      window.payjpCheckoutOnFailed = null;
      window.PayjpCheckout = null;
    };
  });
</script>

<div id="payjp_dialog"></div>
