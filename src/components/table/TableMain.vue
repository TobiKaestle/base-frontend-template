<template>
    <div class="p-2">
        <Headline :type="HeadlineType.H4">{{ $t('table.header.title') }}</Headline>
        <CustomTable :list="data" :labels="tableLabels" :pagination="pagination" colspan="2">
            <template #colspan>
                <col width="1%" />
                <col width="99%" />
            </template>
            <template #desktop-filter> <div class=""></div> </template>
            <template #desktop-options>
                <div class="pb-3">
                    <Button @click.prevent="add()">{{ $t('button.add') }}</Button>
                </div>
            </template>
            <template #desktop-header>
                <th class="CustomTable__cell sortable" @click.prevent="pagination.sort('index')">
                    <label> {{ $t('table.header.index') }} &varr;</label>
                </th>
                <th class="CustomTable__cell sortable" @click.prevent="pagination.sort('name')">
                    <label> {{ $t('table.header.name') }} &varr;</label>
                </th>
            </template>
            <template #desktop-content>
                <tr
                    class="CustomTable__row"
                    @click.prevent="setCurrent(res)"
                    :class="{ last: index + 1 == pagination.pageSize }"
                    v-for="(res, index) in pagination.getFilteredList()"
                    :key="index">
                    <td class="CustomTable__cell">
                        <label> {{ res.index }} </label>
                    </td>
                    <td class="CustomTable__cell">
                        <label> {{ res.name }} </label>
                    </td>
                </tr>
            </template>
            <template #mobile-filter> <div class=""></div> </template>
            <template #mobile-options>
                <div class="pb-3">
                    <Button @click.prevent="add()">{{ $t('button.add') }}</Button>
                </div>
            </template>
            <template #mobile-header>
                <div class="sortable text-left" @click.prevent="pagination.sort('name')">
                    {{ $t('table.header.name') }} &varr;
                </div>
            </template>
            <template #mobile-content>
                <tr
                    class="CustomTable__row"
                    v-for="(res, index) in pagination.getFilteredList()"
                    :key="index">
                    <td class="vca-table-cell">
                        {{ res.name }}
                    </td>
                </tr>
            </template>
        </CustomTable>
    </div>
</template>
<script setup lang="ts">
    import { Button, CustomTable, Headline, HeadlineType, usePagination } from '@vivaconagua/vueca';
    import { computed, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
    const pagination = ref(usePagination());

    const tableLabels = computed(() => {
        return {
            search: t('table.search'),
            page_no_results: t('table.page.no_results'),
            page_label: t('table.page.label'),
            page_size: t('table.page.size'),
            page_first: t('table.page.first'),
            page_prev: t('table.page.back'),
            page_next: t('table.page.next'),
            page_last: t('table.page.last'),
        };
    });

    const data = ref([
        { name: 'Hanna', lastName: 'There', roles: [''] },
        { name: 'John', lastName: 'Dosrt', roles: ['employee'] },
        { name: 'Johanna', lastName: 'Here', roles: ['employee', 'admin'] },
        { name: 'Hans', lastName: 'Hee', roles: ['admin'] },
        { name: 'Ann', lastName: 'Tee', roles: null },
    ]);

    const add = () => {
        data.value.push({ name: 'Johanna', lastName: 'Here', roles: ['employee', 'admin'] });
    };
    pagination.value.setList(data.value);
    pagination.value.pageSize(data.value.length);
    watch(
        () => data.value,
        () => {
            pagination.value.setList(data.value);
            pagination.value.pageSize(data.value.length);
        },
        { deep: true }
    );

    pagination.value.state.filterCallback = (value: any, index: number) => {
        // If the filter is empty, everything is fine
        value.index = index + 1;
        if (emptyFilter.value) {
            return true;
        }

        // Filter for the current value of row.full_name etc.
        return value.name?.toLowerCase().indexOf(pagination.value.state.search.toLowerCase()) > -1;
    };

    const setCurrent = (res: any) => {
        console.log('set current in store here!');
        console.log(res);
    };

    const emptyFilter = computed(() => {
        return !pagination.value.state.search || pagination.value.state.search == '';
    });
</script>
