import { createEmptyField } from '../utils';
import { STATUS, PLAYER } from '../constants';
import { store } from '../store';

export const handleRestart = () => {
	store.dispatch({ type: 'RESTART_GAME' });
};
