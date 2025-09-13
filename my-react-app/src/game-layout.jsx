import { Field } from './components/field/field.jsx';
import { Information } from './components/information/information.jsx';
import { handleRestart } from './handlers/handle-restart';
import styles from './game.module.css';

export const GameLayout = () => (
	<div className={styles.game}>
		<Information />
		<Field />
		<button className={styles.restartButton} onClick={handleRestart}>
			Начать заново
		</button>
	</div>
);
