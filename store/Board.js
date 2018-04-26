import {PLAYER_O, PLAYER_UNKNOWN, PLAYER_X} from './players';
import { COMPLEXITY_DEFAULT } from './complexity';

class Board {
    /**
     * Создание игрового поля
     * @param {Number} height
     * @param {Number} width
     * @returns {Array}
     */
    static create(height, width) {
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

    /**
     * Ход
     * @param {Array} board
     * @param {Number} row
     * @param {Number} cell
     * @param {Number} player
     * @returns {Array}
     */
    static step(board, row, cell, player) {
        let newBoard = board.slice();
        newBoard[row][cell] = player;
        return newBoard;
    }

    /**
     * Установка сложности
     * @param {Number} complexity
     */
    static setComplexity(complexity) {
        this.complexity = complexity;
    }

    /**
     * Получение сложности
     * @return {Number}
     */
    static getComplexity() {
        return this.complexity;
    }

    /**
     * Получение доступного хода
     * @param {Array} board
     * @returns {Array}
     */
    static availableSteps(board) {
        let available = [];
        let i = 0;
        for(let row of board) {
            let n = 0;
            for(let cell of row) {
                if (cell === PLAYER_UNKNOWN) {
                    available.push([i, n]);
                }
                n++;
            }
            i++;
        }

        return available;
    }

    /**
     * Проверяет можно ли совершить ход
     * @param {Array} board
     * @param {Number} row
     * @param {Number} cell
     * @returns {boolean}
     */
    static isAvailableCell(board, row, cell) {
        return typeof board[row] !== 'undefined' && typeof board[row][cell] !== 'undefined' && board[row][cell] === PLAYER_UNKNOWN;
    }

    /**
     * Получение ходов для победы
     * @param {Array} board
     * @param {Number} player
     * @param {Number} target
     * @returns {Array}
     */
    static stepsForVictory(board, player, target) {
        let steps = {};

        for(let i = 0; i < board.length; i++) {
            for(let n = 0; n < board[i].length; n++) {
                /**
                 * Перебор доски, поиск победной комбинации, n в ряд
                 * @param {Function} thinkRow
                 * @param {Function} thinkCell
                 * @return {Number}
                 */
                let think = (thinkRow, thinkCell) => {
                    let players = {};

                    for(let j = 0; j < target; j++) {
                        let row = thinkRow(i, n, j);
                        let cell = thinkCell(i, n, j);

                        if (typeof board[row] === 'undefined' || typeof board[row][cell] === 'undefined') {
                            return null;
                        }

                        if (typeof players[board[row][cell]] === 'undefined') {
                            players[board[row][cell]] = [];
                        }

                        players[board[row][cell]].push([row, cell]);
                    }

                    if (typeof players[player] === 'undefined'
                        || typeof players[PLAYER_UNKNOWN] === 'undefined'
                        || players[PLAYER_UNKNOWN].length !== 1
                        || players[player].length !== target - 1) {
                        return null;
                    }

                    return players[PLAYER_UNKNOWN][0];
                };

                let d = [];

                d.push(think((i, n, j) => i,     (i, n, j) => n + j)); // Поиск победного хода по горизонтали
                d.push(think((i, n, j) => i + j, (i, n, j) => n)); // Поиск победного хода по вертикали
                d.push(think((i, n, j) => i + j, (i, n, j) => n + j)); // Поиск сверху слева в низ вправо
                d.push(think((i, n, j) => i + j, (i, n, j) => n - j)); // Поиск снизу слева в верх в право

                for(let step of d) {
                    if (step === null) {
                        continue;
                    }

                    if (typeof steps[step[0]] === 'undefined') {
                        steps[step[0]] = {};
                    }

                    steps[step[0]][step[1]] = 0;
                }
            }
        }

        let result = [];
        for(let row of Object.keys(steps)) {
            for(let cell of Object.keys(steps[row])) {
                result.push([Number(row), Number(cell)]);
            }
        }
        return result;
    }

    /**
     * Получение случайного значения из массива
     * @param {Array} array
     * @returns {*}
     */
    static randomFromArray(array) {
        const i = Math.floor(Math.random() * array.length);
        if (typeof array[i] === 'undefined') {
            return null;
        }
        return array[i];
    }

    /**
     * Получение случайного доступного хода
     * @param {Array} board
     * @returns {Array}
     */
    static randomAvailableStep(board) {
        return this.randomFromArray(this.availableSteps(board));
    }

    /**
     * Получение случайного победного хода
     * @param {Array} board
     * @param {Number} player
     * @param {Number} target
     * @returns {Array}
     */
    static randomStepForVictory(board, player, target) {
        return this.randomFromArray(this.stepsForVictory(board, player, target));
    }

    /**
     * Получение противника игрока
     * @param {Number} player
     * @returns {number}
     */
    static enemy(player) {
        if (player === PLAYER_O) {
            return PLAYER_X;
        }
        return PLAYER_O;
    }

    /**
     * Выполнение функций по порядку до тех пор пока первая не ве =рнёт какое либо значение
     * отличное от null
     * @param {Function[]} queue
     * @returns {*}
     */
    static queue(queue) {
        for(let fn of queue) {
            let result = fn();
            if (result !== null) {
                return result;
            }
        }
        return null;
    }

    /**
     * Агрессия противника, ищет выигрышный ход, потом ищет ход где нужно защащатся,
     * если не один ход не найден, цель понижается
     * @param {Array} board
     * @param {Number} player
     * @param {Number} target
     * @returns {Array}
     */
    static aggression(board, player, target) {
        let step = this.queue([
            () => this.randomStepForVictory(board, player, target),
            () => this.randomStepForVictory(board, this.enemy(player), target),
        ]);

        if (step !== null) {
            return step;
        }

        if (target - 1 > 1) {
            return this.aggression(board, player, target - 1);
        }

        return null;
    }

    /**
     * Ход компьютера
     * @param {Array} board
     * @param {Number} player - Игрок за которого играет компьютер
     * @param {Number} target
     * @returns {Array}
     */
    static deem(board, player, target) {
        let step = this.queue([
            () => this.aggression(board, player, target),
            () => this.randomAvailableStep(board),
        ]);

        if (step === null) {
            // TODO Нет ходов
        }

        return this.step(board, step[0], step[1], player)
    }

    /**
     * Поиск победителя
     * @param {Array} board
     * @param {Number} target - Сколько нужно собрать в ряд?
     * @return {Number}
     */
    static winner(board, target) {
        if (this.availableSteps(board).length === 0) {
            return {
                player: PLAYER_UNKNOWN,
            };
        }

        for(let i = 0; i < board.length; i++) {
            for(let n = 0; n < board[i].length; n++) {
                if (board[i][n] === PLAYER_UNKNOWN) {
                    continue;
                }

                /**
                 * Перебор доски, поиск победной комбинации, n в ряд
                 * @param {Function} thinkRow
                 * @param {Function} thinkCell
                 * @return {Number}
                 */
                let think = (thinkRow, thinkCell) => {
                    for(let j = 0; j < target; j++) {
                        let row = thinkRow(i, n, j);
                        let cell = thinkCell(i, n, j);

                        if (typeof board[row] === 'undefined' || typeof board[row][cell] === 'undefined' || board[row][cell] !== board[i][n]) {
                            return false;
                       }
                    }
                    return true;
                };

                // Поиск победителя по горизонтали
                if (think((i, n, j) => i, (i, n, j) => n + j)) {
                    return {
                        player: board[i][n],
                        start: [i, n],
                        end: [i, n + target],
                    };
                }

                // Поиск победителя по вертикали
                if (think((i, n, j) => i + j, (i, n, j) => n)) {
                    return {
                        player: board[i][n],
                        start: [i, n],
                        end: [i + target, n],
                    };
                }

                // Поиск сверху слева в низ вправо
                if (think((i, n, j) => i + j, (i, n, j) => n + j)) {
                    return {
                        player: board[i][n],
                        start: [i, n],
                        end: [i + target, n + target],
                    };
                }

                // Поиск снизу слева в верх в право
                if (think((i, n, j) => i + j, (i, n, j) => n - j)) {
                    return {
                        player: board[i][n],
                        start: [i, n],
                        end: [i + target, n - target],
                    };
                }
            }
        }

        return null;
    }
}

Board.complexity = COMPLEXITY_DEFAULT;

export default Board;
