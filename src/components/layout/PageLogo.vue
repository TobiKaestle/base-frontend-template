<template>
    <Card>
        <div class="xl:m-auto xl:w-[50%]">
            <img
                src="~@/assets/img/vca_logo_neutral.png"
                class="mx-auto"
                :title="$t('footer.organisation')" />
        </div>
    </Card>
</template>
<script setup lang="ts">
    import { Card } from '@vivaconagua/vueca';
</script>
