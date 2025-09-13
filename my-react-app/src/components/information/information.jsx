import { PLAYER_ACTION, PLAYER_NAME, STATUS, PLAYER } from '../../constants';
import { InformationLayout } from './information-layout.jsx';
import { store } from '../../store';

export const Information = () => {
	const { gameStatus: status, currentPlayer } = store.getState();
	
	const playerAction = PLAYER_ACTION[status];
	const playerName = PLAYER_NAME[currentPlayer];

	const information =
		status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`;

	return <InformationLayout information={information} />;
};
