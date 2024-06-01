<template>
  <div class="layout">
    <header class="layout__header">
      <h2>AIva 🌄🌅</h2>
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
import { notification } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const { results, loadingStatus } = storeToRefs(useResultsStore())

watch(loadingStatus, (val) => {
  if (val === 'success') {
    openNotification('success')
  } else if (val === 'error') {
    openNotification('error')
  }
})

const openNotification = (type: string) => {
  if (type === 'success') {
    notification.success({
      message: 'Запрос успешно обработан'
    })
  } else if (type === 'error') {
    notification.error({
      message: 'Произошла ошибка при обработке запроса'
    })
  }
}
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

    h2 {
      font-family: 'Roboto Mono', monospace;
      font-optical-sizing: auto;
      font-weight: 300;
      font-style: normal;
    }
  }

  &__main {
    flex: 1;
    padding: 1rem;
  }
}
</style>
