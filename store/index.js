import Vue from 'vue';
import Vuex from 'vuex';
import { PLAYER_X, PLAYER_O, PLAYER_UNKNOWN } from './players';
import { COMPLEXITY_DEFAULT } from './complexity';

Vue.use(Vuex);

const DEFAULT_BOARD_HEIGHT = 20;
const DEFAULT_BOARD_WIDTH = 20;

function createBoard(height, width) {
    let board = [];
    for(let i = 0; i < height; i++) {
        let row = [];
        for(let n = 0; n < width; n++) {
            row.push(PLAYER_UNKNOWN);
        }
        board.push(row);
    }
    return board;
}

const store = () => new Vuex.Store({
    state: {
        height: DEFAULT_BOARD_HEIGHT,
        width: DEFAULT_BOARD_WIDTH,
        target: 5,
        player: PLAYER_X,
        board: createBoard(DEFAULT_BOARD_HEIGHT, DEFAULT_BOARD_WIDTH),
        complexity: COMPLEXITY_DEFAULT,
        drawer: true,
    },

    mutations: {
        setComplexity(state, complexity) {
            this.complexity = complexity;
        },

        setHeight(state, height) {
            state.height = height;
            state.board = createBoard(height, state.width);
        },

        setWidth(state, width) {
            state.width = width;
            state.board = createBoard(state.height, width);
        },

        setTarget(state, target) {
            state.target = target;
            state.board = createBoard(state.height, state.width);
        },

        setPlayer(state, player) {
            state.player = player;
            state.board = createBoard(state.height, state.width);
        },

        toggleDrawer(state) {
            state.drawer = !state.drawer;
        },

        showDrawer(state) {
            state.drawer = true;
        },

        hideDrawer(state) {
            state.drawer = true;
        },

        step(state, { row, cell, player }) {
            if (state.board[row][cell] === PLAYER_UNKNOWN) {
                state.board[row][cell] = player;
            }
        },

        clear(state) {
            state.board = createBoard(state.height, state.width);
        },
    }
});

export default store;
