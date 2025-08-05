<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onErrorCaptured } from 'vue';
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';

// Using errorCaptured lifecycle hook
onErrorCaptured((err) => {
  handleError(err instanceof Error ? err : new Error(String('An unexpected error occurred')));
  return false;
});

const error = ref<Error | AxiosError | null>(null);
const errorMessage = ref('An unexpected error occurred');

// Error handling function
function handleError(err: Error | AxiosError) {
  console.log('Error captured:', err);
  error.value = err;

  if (err instanceof AxiosError && err.response?.data) {
    errorMessage.value = err.response.data.message ||
                         err.response.data.details?.message ||
                         err.message ||
                         'An unexpected error occurred';
  } else {
    errorMessage.value = err.message || 'An unexpected error occurred';
  }

  toast.error(errorMessage.value);
}

// Handle unhandled promise rejections
function unhandledRejectionHandler(event: PromiseRejectionEvent) {
  console.log('Unhandled rejection:', event);
  event.preventDefault();
  handleError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
}

// Handle unhandled runtime errors
function errorHandler(event: ErrorEvent ) {
  event.preventDefault();
  handleError(event.error || new Error(event.message));
}

onMounted(() => {
  window.addEventListener('unhandledrejection', unhandledRejectionHandler);
  window.addEventListener('error', errorHandler);
});

onUnmounted(() => {
  window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
  window.removeEventListener('error', errorHandler);
});
</script>
