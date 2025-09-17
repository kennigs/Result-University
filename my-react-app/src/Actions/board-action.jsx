export const BOARD_CELL_CLICKED = 'BOARD_CELL_CLICKED'

export const boardCellClicked =  (row, col) => ({
    type: BOARD_CELL_CLICKED,
    payload: { row, col }

})