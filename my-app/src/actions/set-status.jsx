import { ACTION_TYPE } from "./action-type";

export const setStatus = (status) => ({
	type: ACTION_TYPE.SET_STATUS,
	payload: status,
})