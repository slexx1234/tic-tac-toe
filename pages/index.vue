<template>
    <div>
        <board>
            <board-row v-for="(row, i) in $store.state.board" :key="i">
                <board-cell :clickable="$store.state.winner === null" v-for="(cell, n) in row" :key="n" :player="cell" @step="step(i, n)"/>
            </board-row>
        </board>

        <v-dialog :value="$store.state.winner !== null" max-width="200px">
            <v-card>
                <v-card-text class="text-xs-center">
                    <template v-if="$store.state.winner !== null">
                        <h1 class="green--text" v-if="$store.state.winner.player === $store.state.player">YOUR WIN!</h1>
                        <h1 class="red--text" v-else-if="$store.state.winner.player === $store.state.enemy">YOUR LOSE!</h1>
                        <h1 v-else>NO STEPS!</h1>
                    </template>
                    <v-btn color="primary" class="mx-auto mt-3" @click.stop="newGame">NEW GAME</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
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