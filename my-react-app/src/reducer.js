export const reducer = (state, {type, payload}) => {
    switch (type) {
        case 'SET_CURRENT_PLAYER':
            return {
                ...state,
                currentPlayer: payload
            }
            case 'SET_FIELD':
                return {
                    ...state,
                    field: payload,
                    moveCount: state.moveCount + 1
                }
            case 'RESTART_GAME':
                return {
                    currentPlayer: 0,
                    field: new Array(9).fill(2),
                    gameStatus: 0,
                    winner: 2,
                    score: {
                        0: 0,
                        1: 0,
                        draws: 0,
                    },
                    history: [],
                    moveCount: 0,
                };
            case 'SET_STATUS':
                return {
                    ...state,
                    gameStatus: payload
                }
            case 'SET_WINNER':
                return {
                    ...state,
                    winner: payload
                }
            case 'SET_SCORE':
                return {
                    ...state,
                    score: payload
                }
            default:
                return state
    }
}