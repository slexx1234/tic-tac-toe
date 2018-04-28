import Vue from 'vue';
import Vuex from 'vuex';
import Board from './Board';
import Storage from './Storage';
import { COMPLEXITY_DEFAULT } from './complexity';
import { PLAYER_X, PLAYER_O, PLAYER_UNKNOWN } from './players';

Vue.use(Vuex);

const DEFAULT_BOARD_HEIGHT = 20;
const DEFAULT_BOARD_WIDTH = 10;

const DEFAULT_BOARD = Board.create(DEFAULT_BOARD_HEIGHT, DEFAULT_BOARD_WIDTH);

const store = () => new Vuex.Store({
    state: {
        height: DEFAULT_BOARD_HEIGHT,
        width: DEFAULT_BOARD_WIDTH,
        target: 5,
        enemy: PLAYER_O,
        player: PLAYER_X,
        board: DEFAULT_BOARD,
        complexity: COMPLEXITY_DEFAULT,
        drawer: true,
        winner: Board.winner(DEFAULT_BOARD),
    },

    mutations: {
        setWinner(state, winner) {
            state.winner = winner;
            Storage.save(state);
        },

        setComplexity(state, complexity) {
            state.complexity = complexity;
            Board.setComplexity(complexity);
            Storage.save(state);
        },

        setHeight(state, height) {
            state.height = height;
            state.board = Board.create(height, state.width);
            state.winner = Board.winner(state.board);
            Storage.save(state);
        },

        setWidth(state, width) {
            state.width = width;
            state.board = Board.create(state.height, width);
            state.winner = Board.winner(state.board);
            Storage.save(state);
        },

        setTarget(state, target) {
            state.target = target;
            state.board = Board.create(state.height, state.width);
            state.winner = Board.winner(state.board);
            Storage.save(state);
        },

        setPlayer(state, player) {
            if (player === PLAYER_O) {
                state.enemy = PLAYER_X;
            } else {
                state.enemy = PLAYER_O;
            }
            state.player = player;
            state.board = Board.create(state.height, state.width);
            state.winner = Board.winner(state.board);
            Storage.save(state);
        },

        toggleDrawer(state) {
            state.drawer = !state.drawer;
            Storage.save(state);
        },

        showDrawer(state) {
            state.drawer = true;
            Storage.save(state);
        },

        hideDrawer(state) {
            state.drawer = true;
            Storage.save(state);
        },

        currentPlayerStep(state, { row, cell }) {
            if (state.board[row][cell] === PLAYER_UNKNOWN) {
                state.board = Board.step(state.board, row, cell, state.player);
                state.winner = Board.winner(state.board, state.target);
                if (state.winner === null) {
                    state.board = Board.deem(state.board, state.enemy, state.target, state.complexity);
                }
                state.winner = Board.winner(state.board, state.target);
                Storage.save(state);
            }
        },

        step(state, { row, cell, player }) {
            if (state.board[row][cell] === PLAYER_UNKNOWN) {
                state.board = Board.step(state.board, row, cell, player);
                state.winner = Board.winner(state.board);
                Storage.save(state);
            }
        },

        clear(state) {
            state.board = Board.create(state.height, state.width);
            state.winner = Board.winner(state.board);
            Storage.save(state);
        },

        loadSavedState(state) {
            const savedState = Storage.load();

            if (savedState === null) {
                return;
            }

            for(let key in savedState) {
                state[key] = savedState[key];
            }
        },
    },

    actions: {
        step({ state, commit }, { row, cell }) {
            commit('currentPlayerStep', { row, cell });
        },
    },
});

export default store;
