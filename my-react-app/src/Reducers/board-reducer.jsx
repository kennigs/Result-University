import { BOARD_CELL_CLICKED } from "../Actions";
import { checkEmptyCell } from '../utils/check-empty-cell'
import { createEmptyField } from '../utils/create-empty-field'

const initialBoardState = {
    field: createEmptyField(3)
}

export const boardReducer = (state = initialBoardState, action)=> {
    switch(action.type) {
        case BOARD_CELL_CLICKED: {
            const { row, col } = action.payload
            if(!checkEmptyCell(state.field, row, col)) return state

            const newField = state.field.map((r, ri)=> 
            r.map((cell, ci) => (ri === row && ci === col ? 'X' : cell))
        )
        return { ...state, field: newField}
    }
    default: 
        return state
}
}