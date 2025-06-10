<template>
    <Card>
        <Card bordered class="shadowed text-center">
            <Headline :type="HeadlineType.H1">{{ $t('messages.title.warn') }}</Headline>
            <Headline :type="HeadlineType.H3">{{ $t('messages.error.page_404') }}</Headline>
        </Card>
    </Card>
</template>
<script setup lang="ts">
    import { HeadlineType } from '@vivaconagua/vueca';
    import { Card, Headline } from '@vivaconagua/vueca';
</script>
