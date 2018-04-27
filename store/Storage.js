import {PLAYER_O, PLAYER_X} from "./players";
import Board from "./Board";
import {COMPLEXITY_DEFAULT} from "./complexity";

export default class Storage {
    static isNotSupportedLocalStorage() {
        return typeof localStorage === 'undefined';
    }

    static save(state) {
        if (this.isNotSupportedLocalStorage()) {
            return;
        }

        console.log(process.browser);

        localStorage.setItem('height', state.height);
        localStorage.setItem('width', state.width);
        localStorage.setItem('target', state.target);
        localStorage.setItem('player', state.player);
        localStorage.setItem('board', JSON.stringify(state.board));
        localStorage.setItem('complexity', state.complexity);
        localStorage.setItem('winner', JSON.stringify(state.winner));
    }

    static load(defaults = null) {
        if (this.isNotSupportedLocalStorage()) {
            return defaults;
        }

        let state = {};

        const loadNumber = key => {
            let value = Number(localStorage.getItem(key));
            if (!isNaN(value)) state[key] = value;
        };

        const loadJson = key => {
            let value = localStorage.getItem(key);
            try {
                value = JSON.parse(value);
            } catch(e) {
                value = null;
            }

            if (value !== null) {
                state[key] = value;
            }
        };

        loadNumber('height');
        loadNumber('width');
        loadNumber('target');
        loadNumber('player');
        loadNumber('complexity');

        loadJson('board');
        loadJson('winner');

        return state;
    }
};
