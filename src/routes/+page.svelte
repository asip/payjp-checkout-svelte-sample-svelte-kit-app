<script lang="ts">
  import PayjpCheckout from '../components/payjp-checkout.svelte';
  import type { PayjpCheckoutPayload, PayjpCheckoutErrorPayload } from '#lib';
  import { PUBLIC_PAYJP_DATA_KEY } from '$app/env/public';

  const dataKey = PUBLIC_PAYJP_DATA_KEY;

  const onCreated = (payload: PayjpCheckoutPayload) => {
    console.log(payload.token);
  };

  const onFailed = (payload: PayjpCheckoutErrorPayload) => {
    console.log(payload.message);
  };
</script>

<PayjpCheckout
  dataKey={dataKey}
  dataPartial="true"
  onCreatedHandler={onCreated}
  onFailedHandler={onFailed}
/>
