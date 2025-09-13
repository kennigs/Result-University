import { legacy_createStore as createStore } from 'redux'
import { reducer } from './reducer'
import { PLAYER } from './constants/player'
import { STATUS } from './constants/status'
import { createEmptyField } from './utils/create-empty-field'

const initialState = {
    currentPlayer: PLAYER.CROSS,
    field: createEmptyField(),
    gameStatus: STATUS.TURN,
    winner: PLAYER.NOBODY,
    score: {
        [PLAYER.CROSS]: 0,
        [PLAYER.NOUGHT]: 0,
        draws: 0,
    },
    history: [],
    moveCount: 0,
}

const store = createStore(reducer, initialState)


console.log('Store state:', store.getState());

export { store }