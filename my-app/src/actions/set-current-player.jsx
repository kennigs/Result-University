import { ACTION_TYPE } from "./action-type";


export const setCurrentPlayer = (currentPlayer) => ({
	type: ACTION_TYPE.SET_CURRENT_PLAYER,
	payload: currentPlayer,
})