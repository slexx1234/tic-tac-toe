<template>
    <div class="board__row">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'board-row',
    }
</script>

<style lang="scss">
    .board__row {
        display: flex;
        border-bottom: 2px solid #ddd;

        &:last-child {
            border-bottom: none;
        }
    }
</style>
