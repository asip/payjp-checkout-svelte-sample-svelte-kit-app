<script lang="ts">
  import PayjpCheckout from '../components/payjp-checkout.svelte';
  import type { PayjpCheckoutPayload, PayjpCheckoutErrorPayload } from '#lib';
  import { PUBLIC_PAYJP_DATA_KEY } from '$app/env/public';

  const data = { key: PUBLIC_PAYJP_DATA_KEY, partial: "true" };

  const onSuccess = (payload: PayjpCheckoutPayload) => {
    console.log(payload.token);
  };

  const onError = (payload: PayjpCheckoutErrorPayload) => {
    console.log(payload.message);
  };
</script>

<PayjpCheckout
  data="{ data }"
  onSuccess={onSuccess}
  onError={onError}
/>
