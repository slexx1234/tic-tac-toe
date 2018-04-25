<template>
    <board>
        <board-row v-for="(row, i) in $store.state.board" :key="i">
            <board-cell v-for="(cell, n) in row" :key="n" :player="cell" @step="step(i, n)"/>
        </board-row>
    </board>
</template>

<script>
    export default {
        methods: {
            step(row, cell) {
                this.$store.dispatch('step', { row, cell });
            },
        },
    };
</script>