<template>
  <div class="layout">
    <header class="layout__header">
      <h2>ULTRA Генератор изображений 🌅</h2>
    </header>
    <main class="layout__main">
      <PromptWithOptions />
      <ResultsPreview v-if="results.length" />
    </main>
  </div>
</template>

<script setup lang="ts">
import PromptWithOptions from '@/components/PromptWithOptions.vue'
import ResultsPreview from '@/components/ResultsPreview.vue'
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'

const { results } = storeToRefs(useResultsStore())
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    padding: 1rem;
  }

  &__main {
    flex: 1;
    padding: 1rem;
  }
}
</style>
