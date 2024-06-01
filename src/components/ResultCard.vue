<template>
  <div class="result-card">
    <div class="result-card__img">
      <a-image :width="200" :height="150" :src="props.url">
        <template #previewMask>
          <span style="text-align: center; display: block">Нажмите для просмотра</span>
        </template>
      </a-image>
    </div>
    <div class="result-card__type">
      <span>{{ TYPES_DICT[props.type] }}</span>
      <a-checkbox v-model:checked="isChecked"></a-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TYPES_DICT } from '@/dicts'
import { computed } from 'vue'

type TProps = {
  type: string
  url: string
  checked: boolean
}

const props = defineProps<TProps>()

const emits = defineEmits(['update:checked'])

const isChecked = computed({
  get: () => props.checked,
  set: (value) => {
    console.log(value)
    emits('update:checked', value)
  }
})
</script>

<style lang="scss">
.result-card {
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 2px solid #f5f5f5;
  border-radius: 1rem;
  overflow: hidden;
  width: fit-content;

  &__img {
    display: flex;
    justify-content: center;
    height: 150px;

    .ant-image {
      display: flex;

      img {
        object-fit: contain;
      }
    }
  }

  &__type {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 0.75rem;
    }
  }
}
</style>
