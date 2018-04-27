<template>
    <div class="line-wrap">
        <board ref="board">
            <board-row v-for="(row, i) in $store.state.board" :key="i">
                <board-cell :clickable="$store.state.winner === null" v-for="(cell, n) in row" :key="n" :player="cell" @step="step(i, n)"/>
            </board-row>
        </board>

        <transition name="line">
            <svg class="line" v-if="isShowLine">
                <line :x1="linePosition.x1"
                      :y1="linePosition.y1"
                      :x2="linePosition.x2"
                      :y2="linePosition.y2"
                      :style="lineStyles" />
            </svg>
        </transition>

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

<style lang="scss">
    .line-wrap {
        position: relative;
    }

    .line {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .line-enter-active,
    .line-leave-active {
        transition: opacity .3s;
    }

    .line-enter,
    .line-leave-to {
        opacity: 0;
    }
</style>

<script>
    import { PLAYER_UNKNOWN } from '../store/players';

    export default {
        computed: {
            isShowLine() {
                return this.$store.state.winner !== null && this.$store.state.winner.player !== PLAYER_UNKNOWN;
            },

            linePosition() {
                try {
                    const startCell = this.$store.state.winner.start;
                    const endCell = this.$store.state.winner.end;
                    const startElement = this.$refs.board.$children[startCell[0]].$children[startCell[1]].$el;
                    const endElement = this.$refs.board.$children[endCell[0]].$children[endCell[1]].$el;
                    const offsetV = startElement.offsetHeight / 2;
                    const offsetH = startElement.offsetWidth / 2;
                    const y1 = startElement.offsetTop + offsetV;
                    const x1 = startElement.offsetLeft + offsetH;

                    // Horizontal
                    if (startCell[0] === endCell[0]) {
                        return {
                            y1,
                            x1,
                            y2: endElement.offsetTop + offsetV,
                            x2: endElement.offsetLeft - offsetH,
                        };
                    }

                    // Vertical
                    if (startCell[0] !== endCell[0] && startCell[1] === endCell[1]) {
                        return {
                            y1,
                            x1,
                            y2: endElement.offsetTop - offsetV,
                            x2: endElement.offsetLeft + offsetH,
                        };
                    }

                    if (startCell[1] < endCell[1]) {
                        return {
                            y1,
                            x1,
                            y2: endElement.offsetTop - offsetV,
                            x2: endElement.offsetLeft - offsetH,
                        };
                    }

                    return {
                        y1,
                        x1,
                        y2: endElement.offsetTop + offsetV,
                        x2: endElement.offsetLeft + offsetH,
                    };
                } catch(e) {
                    return {};
                }
            },

            lineStyles() {
                return {
                    stroke: '#424242',
                    strokeLinecap: 'round',
                    strokeWidth: '6px'
                };
            },
        },

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