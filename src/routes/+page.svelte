<script lang="ts">
  import PayjpCheckout from '../components/payjp-checkout.svelte';
  import type {
    PayjpCheckoutPayload,
    PayjpCheckoutErrorPayload
  } from '../components/payjp-checkout.svelte';
  import { PUBLIC_PAYJP_DATA_KEY } from '$env/static/public';

  const dataKey = PUBLIC_PAYJP_DATA_KEY;

  const onCreated = (payload: PayjpCheckoutPayload) => {
    console.log(payload.token);
  };

  const onFailed = (payload: PayjpCheckoutErrorPayload) => {
    console.log(payload.message);
  };
</script>

<PayjpCheckout
  {dataKey}
  dataPartial="true"
  onCreatedHandler={onCreated}
  onFailedHandler={onFailed}
/>
