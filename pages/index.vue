<template>
    <board>
        <board-row v-for="(row, i) in $store.state.board" :key="i">
            <board-cell :clickable="$store.state.winner === null" v-for="(cell, n) in row" :key="n" :player="cell" @step="step(i, n)"/>
        </board-row>

        <v-dialog :value="$store.state.winner !== null" max-width="200px">
            <v-card>
                <v-card-text class="text-xs-center">
                    <h1 class="green--text" v-if="$store.state.player === $store.state.player">YOUR WIN!</h1>
                    <h1 class="red--text" v-else>YOUR LOSE!</h1>

                        <v-btn color="primary" class="mx-auto mt-3" @click.stop="newGame">NEW GAME</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </board>
</template>

<script>
    export default {
        methods: {
            step(row, cell) {
                this.$store.dispatch('step', { row, cell });
            },

            newGame() {
                this.$store.commit('clear');
            },
        },
    };
</script>