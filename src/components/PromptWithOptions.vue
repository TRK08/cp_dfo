<template>
  <div class="prompt">
    <a-spin :spinning="loadingStatus !== 'init'">
      <div class="prompt__wrap">
        <a-textarea v-model:value="inputValue" placeholder="Введите свой текст" class="prompt__input" allow-clear
          :autoSize="{
            minRows: 10,
            maxRows: 15
          }" />
        <div class="prompt__right">
          <div class="prompt__options">
            <a-select v-model:value="multiSelect" :max-tag-count="3" mode="multiple" style="width: 100%"
              :showSearch="false" placeholder="Выберите типы изображений" :options="checkboxes"></a-select>
            <!-- <a-select placeholder="Стилизация" v-model:value="value2" style="width: 100%"> -->
            <!--   <a-select-option value="lucy">Lucy</a-select-option> -->
            <!-- </a-select> -->
          </div>
          <a-button type="primary" :disabled="!inputValue.length || !multiSelect.length"
            @click="sendToGenerate">Отправить</a-button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useResultsStore } from '@/stores/results'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { loadingStatus } = storeToRefs(useResultsStore())
const { generateImages } = useResultsStore()

const inputValue = ref('')
const value2 = ref()

const multiSelect = ref([
  // 'InfoBoards',
  // 'DemoSystems',
  // 'LockScreens',
  // 'IntranetPortal',
  // 'NewsDigest',
  // 'TVPanel',
  // 'InfoMessage'
])

const checkboxes = ref([
  {
    label: 'Информационная доска',
    value: 'InfoBoards'
  },
  {
    label: 'Тейбл тент',
    value: 'DemoSystems'
  },
  {
    label: 'Экран блокировки',
    value: 'LockScreens'
  },
  {
    label: 'Интернет-портал',
    value: 'IntranetPortal'
  },
  {
    label: 'Дайджест новостей',
    value: 'NewsDigest'
  },
  {
    label: 'ТВ-панель',
    value: 'TVPanel'
  },
  {
    label: 'Инф. сообщение',
    value: 'InfoMessage'
  }
])

const sendToGenerate = async () => {
  const formats: Record<string, boolean> = {}
  checkboxes.value.map((item) => {
    if (multiSelect.value.includes(item.value)) {
      formats[item.value] = true
    } else {
      formats[item.value] = false
    }
  })
  await generateImages(inputValue.value, formats)
  if (loadingStatus.value === 'success') {
    inputValue.value = ''
  }
}
</script>

<style lang="scss">
.prompt {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 1rem;

  &__wrap {
    display: flex;
    gap: 1rem;

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  &__options {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
}
</style>
