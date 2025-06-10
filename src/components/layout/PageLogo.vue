<template>
    <Card>
        <div class="md:m-auto md:w-[50%]">
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
