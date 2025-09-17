import { ACTION_TYPE } from './action-type'

export const setField = (field) => ({
	type: ACTION_TYPE.SET_FIELD,
	payload: field,
})