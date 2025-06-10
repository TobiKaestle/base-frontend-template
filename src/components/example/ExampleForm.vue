<template>
    <Column class="gap-4">
        <Card :bordered="true">
            <Headline :type="HeadlineType.H4">{{ $t('example.general.label') }}</Headline>
            <p>{{ $t('example.general.description') }}</p>
            <Column>
                <TextField
                    :label="$t('example.name.label')"
                    :rules="v$.data.name"
                    ref="name"
                    v-model="data.name" />
                {{ data.description }}
                <HtmlEditor :label="$t('example.description.label')" v-model="data.description" />
            </Column>
        </Card>
        <FormField>
            <Button @click.prevent="doEmit">
                {{ $t('button.save') }}
            </Button>
        </FormField>
    </Column>
</template>

<script lang="ts" setup>
    import { useExamplesStore } from '@/stores/ExamplesStore';
    import { Example } from '@/types/Example';
    import { HeadlineType } from '@vivaconagua/vueca';

    import {
        Button,
        Card,
        Column,
        FormField,
        Headline,
        HtmlEditor,
        TextField,
    } from '@vivaconagua/vueca';
    import useVuelidate from '@vuelidate/core';

    import { ref, watch } from 'vue';
    const store = useExamplesStore();
    interface Props {
        modelValue: Example;
    }

    const props = defineProps<Props>();

    const emit = defineEmits(['submit']);
    const doEmit = () => {
        if (v$.value.data.$invalid) {
            validate();
        } else {
            emit('submit', data.value);
        }
    };
    const data = ref(props.modelValue);

    const name = ref();

    const validate = () => {
        name.value.validate();
    };
    watch(
        () => props.modelValue,
        (value) => {
            data.value = value;
        }
    );
    const validations = () => {
        return store.validations;
    };
    const v$ = useVuelidate(validations(), { data });
</script>
