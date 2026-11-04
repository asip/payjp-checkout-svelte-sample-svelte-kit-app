<script lang="ts">
  import PayjpCheckout from '../components/payjp-checkout.svelte';
  import type { PayjpCheckoutPayload, PayjpCheckoutErrorPayload } from '#lib';
  import { PUBLIC_PAYJP_DATA_KEY } from '$app/env/public';

  const data = { key: PUBLIC_PAYJP_DATA_KEY, partial: "true" };

  const onCreated = (payload: PayjpCheckoutPayload) => {
    console.log(payload.token);
  };

  const onFailed = (payload: PayjpCheckoutErrorPayload) => {
    console.log(payload.message);
  };
</script>

<PayjpCheckout
  data="{ data }"
  onCreatedHandler={onCreated}
  onFailedHandler={onFailed}
/>
