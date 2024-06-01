<template>
  <div class="results-preview">
    <h2 class="results-preview__title">Результаты</h2>
    <a-alert
      v-if="presentation && presentation.length > 0"
      class="results-preview__alert"
      type="info"
      show-icon
    >
      <template #message>
        <div style="display: flex; align-items: center; gap: 1rem">
          <span>Для редактирования изображений скачайте файл .pptx</span>
          <a-tooltip>
            <template #title
              >Инструкция по сохранению слайда в нужном формате: <br />
              1. Откройте файл в PowerPoint <br />
              2. Слева в меню выберите слайд <br />
              3. Нажмите в верхней панели "Файл" > "Экспорт" и выберите нужный формат
            </template>
            <QuestionCircleOutlined />
          </a-tooltip>
        </div>
      </template>
      <template #action>
        <div>
          <a-button @click="downloadPptx" size="small" type="primary">Скачать</a-button>
        </div>
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
import { computed } from 'vue'
import ResultCard from './ResultCard.vue'
import { storeToRefs } from 'pinia'
import { useResultsStore } from '@/stores/results'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
const { results, loadingStatus, presentation } = storeToRefs(useResultsStore())
const { downloadZipFiles, downloadPptx } = useResultsStore()
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
    padding: 0.5rem 1rem;
    background-color: #f5f5f5;
    border-radius: 1rem;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: flex-end;
  }
}
</style>
