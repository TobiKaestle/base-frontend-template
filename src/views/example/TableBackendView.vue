<template>
    <ExampleBackendList :pagination="pagination" />
    <Popup
        :show="store.current.id"
        @close="closeCurrent()"
        v-if="store.doEdit"
        :title="$t('context_button.edit', [$t('example.context')])">
        <ExampleForm @submit="saveCurrent()" is-edit v-model="store.edit" />
        <Card class="text-center">
            <Button
                :type="ButtonType.Cancel"
                @click.prevent="deleteCurrent()"
                :size="ButtonSize.Small">
                {{ $t('button.delete') }}
            </Button>
        </Card>
    </Popup>
    <Popup
        :show="store.doCreate"
        @close="closeCreate()"
        v-if="store.doCreate"
        :title="$t('context_button.add', [$t('example.context')])">
        <ExampleForm @submit="saveCreate()" v-model="store.create" />
    </Popup>
    <Popup
        :show="store.current.id"
        @close="closeCurrent()"
        v-if="store.doView"
        :title="$t('context_button.view', [$t('example.context')])">
        <ExampleDisplay v-model="store.current" />
        <Card class="py-4 text-center">
            <Button
                :type="ButtonType.Cancel"
                @click.prevent="deleteCurrent()"
                :size="ButtonSize.Small">
                {{ $t('context_button.delete', [$t('example.context')]) }}
            </Button>
        </Card>
    </Popup>
</template>
<script setup lang="ts">
    import ExampleBackendList from '@/components/example/ExampleBackendList.vue';
    import ExampleDisplay from '@/components/example/ExampleDisplay.vue';
    import ExampleForm from '@/components/example/ExampleForm.vue';
    import { useExamplesStore } from '@/stores/ExamplesStore';
    import api from '@/stores/api';
    import { Example } from '@/types/Example';
    import {
        Button,
        ButtonSize,
        ButtonType,
        Card,
        Popup,
        useAsyncPagination,
    } from '@vivaconagua/vueca';
    import { onBeforeMount } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const store = useExamplesStore();
    const pagination = useAsyncPagination(api.call, 'examples');

    onBeforeMount(() => {
        pagination.request(true).then((response: Example[]) => {
            pagination.setList(response.map((el) => ({ ...el, description: 'AAAA' })));
        });
    });

    const closeCurrent = () => {
        store.doView = false;
        store.doEdit = false;
        store.resetCurrent();
        store.resetEdit();
    };
    const saveCurrent = () => {
        if (!confirm(t('example.confirm.update'))) {
            return;
        }
        store.update().then(() => {
            closeCurrent();
        });
    };
    const closeCreate = () => {
        store.doCreate = false;
    };
    const deleteCurrent = () => {
        if (!confirm(t('example.confirm.delete'))) {
            return;
        }
        store.delete().then(() => {
            closeCurrent();
            pagination.request();
        });
    };
    const saveCreate = () => {
        if (!confirm(t('example.confirm.add'))) {
            return;
        }
        store.add().then(() => {
            store.doCreate = false;
            store.resetCreate();
            pagination.state.pageSize++;
            pagination.request();
        });
    };
</script>
