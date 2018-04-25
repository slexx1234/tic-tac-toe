import { PLAYER_UNKNOWN } from './players';
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
     * Ход компьютера
     * @param {Array} board
     * @param {Number} player - Игрок за которого играет компьютер
     * @returns {Array}
     */
    static deem(board, player) {
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

        let step = available[Math.floor(Math.random() * available.length)];

        return this.step(board, step[0], step[1], player)
    }

    /**
     * Поиск победителя
     * @param {Array} board
     * @param {Number} target - Сколько нужно собрать в ряд?
     * @return {Number}
     */
    static winner(board, target) {
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
