<template>
    <v-app>
        <v-navigation-drawer fixed clipped v-model="drawer" app dark>
            <v-container>
                <v-text-field type="number" label="Board width" min="1" v-model="width"/>
                <v-text-field type="number" label="Board height" min="1" v-model="height"/>
                <v-text-field type="number" label="Necessary to collect in a row" min="3" v-model="target"/>
                <v-select :items="players" v-model="player" label="Player"/>
                <v-select :items="complexities" v-model="complexity" label="Complexity"/>
                <v-btn @click="newGame" color="primary" block>New game</v-btn>
            </v-container>
        </v-navigation-drawer>
        <v-toolbar color="blue" class="white--text" fixed clipped-left app>
            <v-toolbar-side-icon @click.stop="toggleDrawer" class="white--text"/>
            <v-toolbar-title class="mr-5 align-center">
                <span class="title">Tic-tac-toe game</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fill-height>
                <v-layout justify-center align-center>
                    <nuxt/>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import { PLAYER_O, PLAYER_X } from '../store/players';
    import { COMPLEXITY_EASY, COMPLEXITY_MEDIUM, COMPLEXITY_HARD } from '../store/complexity';

    export default {
        data() {
            return {
                width: this.$store.state.width,
                height: this.$store.state.height,
                target: this.$store.state.target,
                player: this.$store.state.player,
                complexity: this.$store.state.complexity,
                drawer: this.$store.state.drawer,
                players: [
                    { value: PLAYER_O, text: 'O' },
                    { value: PLAYER_X, text: 'X' },
                ],
                complexities: [
                    { value: COMPLEXITY_EASY, text: 'Easy' },
                    { value: COMPLEXITY_MEDIUM, text: 'Medium' },
                    { value: COMPLEXITY_HARD, text: 'Hard' },
                ],
            };
        },

        watch: {
            width(width) {
                this.$store.commit('setWidth', width);
            },

            height(height) {
                this.$store.commit('setHeight', height);
            },

            target(target) {
                this.$store.commit('setTarget', target);
            },

            player(player) {
                this.$store.commit('setPlayer', player);
            },

            complexity(complexity) {
                this.$store.commit('setComplexity', complexity);
            },

            drawer(drawer) {
                this.$store.commit(drawer ? 'showDrawer' : 'hideDrawer');
            },
        },

        methods: {
            newGame() {
                this.$store.commit('clear');
            },

            toggleDrawer() {
                this.drawer = !this.drawer;
            },
        }
    }
</script>

<style>
    html {
        overflow: auto;
    }
</style>
