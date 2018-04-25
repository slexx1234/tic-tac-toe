<template>
    <div :class="wrapClass" @click="onClick">
        <div :class="playerClass"></div>
    </div>
</template>

<script>
    import { PLAYER_UNKNOWN, PLAYER_X, PLAYER_O } from '../store/players';

    export default {
        name: 'board-cell',

        props: {
            player: Number,
            clickable: Boolean,
        },

        computed: {
            wrapClass() {
                let result = ['board__cell'];

                if (this.clickable && this.player === PLAYER_UNKNOWN) result.push('board__cell--clickable');

                return result;
            },

            playerClass() {
                let result = ['board__player'];

                switch(this.player) {
                    case PLAYER_X:
                        result.push('board__player--x');
                        break;

                    case PLAYER_O:
                        result.push('board__player--o');
                        break;
                }

                return result;
            }
        },

        methods: {
            onClick() {
                if (this.player === PLAYER_UNKNOWN && this.clickable) {
                    this.$emit('step');
                }
            },
        },
    }
</script>

<style lang="scss">
    .board__cell {
        width: 40px;
        height: 40px;
        border-right: 2px solid #ddd;

        &:last-child {
            border-right: none;
        }

        &--clickable {
            cursor: pointer;
        }
    }

    .board__player {
        &--o {
            cursor: default;
            &:after {
                content: '';
                display: block;
                width: 30px;
                height: 30px;
                margin: 5px;
                border-radius: 50%;
                border: 3px solid #7c8aff;
            }
        }

        &--x {
            cursor: default;
            position: relative;

            &:before,
            &:after {
                content: '';
                display: block;
                position: absolute;
                background: #ff6b6b;
                float: left;
                border-radius: 2px;
                width: 4px;
                height: 30px;
                left: 17px;
                top: 5px;
                transform-origin: 50% 50%;
            }

            &:after {
                transform: rotate(45deg);
            }

            &:before {
                transform: rotate(-45deg);
            }
        }
    }
</style>
