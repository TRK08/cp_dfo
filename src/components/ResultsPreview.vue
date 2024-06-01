<template>
  <div class="results-preview">
    <h2 class="results-preview__title">Результаты</h2>
    <a-alert
      v-if="presentation && presentation.length > 0"
      class="results-preview__alert"
      message="Для редактирования изображений скачайте файл .pptx"
      type="info"
      show-icon
    >
      <template #action>
        <a-space direction="vertical">
          <a-button @click="downloadZipFiles('pptx')" size="small" type="primary">Скачать</a-button>
        </a-space>
      </template>
    </a-alert>
    <div class="results-preview__wrap">
      <template v-for="item in results">
        <ResultCard :url="item.url" :type="item.type" v-model:checked="item.isSelected" />
      </template>
    </div>
    <div class="results-preview__panel">
      <a-button @click="selectAll">{{
        isAllChecked ? 'Снять выделение' : 'Выделить все'
      }}</a-button>
      <a-button @click="downloadZipFiles('png')" :disabled="isAllUnchecked" type="primary"
        >Скачать</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ResultCard from './ResultCard.vue'
import { storeToRefs } from 'pinia'
import { useResultsStore } from '@/stores/results'

const { results, loadingStatus, presentation } = storeToRefs(useResultsStore())
const { downloadZipFiles } = useResultsStore()
const isAllChecked = computed(() => {
  return results.value.every((item) => item.isSelected)
})

const isAllUnchecked = computed(() => {
  return results.value.every((item) => !item.isSelected)
})

const selectAll = () => {
  if (isAllChecked.value) {
    results.value = results.value.map((item) => {
      item.isSelected = false
      return item
    })
  } else {
    results.value = results.value.map((item) => {
      item.isSelected = true
      return item
    })
  }

  // data.value = data.value.map((item) => {
  //   item.isSelected = !item.isSelected
  //   return item
  // })
}
</script>

<style lang="scss">
.results-preview {
  margin-top: 2rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__alert {
    margin-bottom: 1rem;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 1rem;
  }

  &__panel {
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 1rem;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: flex-end;
  }
}
</style>
