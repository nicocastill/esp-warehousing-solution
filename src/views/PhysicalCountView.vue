<script setup>
import TruckloadScanComponent from '../components/PhysicalCount.vue'
import { useRouter } from 'vue-router'
</script>

<template>
  <main>
    <TruckloadScanComponent @cancel="cancelAction" />
  </main>
</template>

<script>
export default {
  setup() {
    const router = useRouter();

    const cancelAction = () => {
      router.push('/');
    };

    return {
      cancelAction
    }
  }
};
</script>
