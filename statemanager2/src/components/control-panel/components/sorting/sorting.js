import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../button/button';
import { selectIsAlphabetSorting } from '../../../../selectors';
import { ACTION_TYPE } from '../../../../actions';
import styles from './sorting.module.css';

export const Sorting = () => {
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
	const dispatch = useDispatch();

	const onChange = ({ target }) => {
		dispatch({ type: ACTION_TYPE.SET_IS_ALPHABET_SORTING, payload: target.checked });
	};

	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isAlphabetSorting}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
