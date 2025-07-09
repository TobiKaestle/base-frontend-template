<template>
    <Column class="gap-4">
        <section>
            <Headline :type="HeadlineType.H4">{{ $t('example.general.label') }}</Headline>
            <div class="grid grid-cols-4">
                <div class="font-bold">{{ $t('example.name.label') }}</div>
                <div>{{ data.name }}</div>
                <div class="font-bold">{{ $t('example.description.label') }}</div>
                <p v-html="data.description" />
            </div>
        </section>
    </Column>
</template>

<script lang="ts" setup>
    import { Example } from '@/types/Example';
    import { ref, watch } from 'vue';

    import { Column, Headline, HeadlineType } from '@vivaconagua/vueca';

    interface Props {
        modelValue: Example;
    }
    const props = defineProps<Props>();

    const data = ref(props.modelValue);
    watch(
        () => props.modelValue,
        (value) => {
            data.value = value;
        }
    );
</script>
