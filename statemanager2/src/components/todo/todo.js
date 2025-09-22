import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectEditingTodoId,
	selectEditingTodoTitle,
	selectIsLoading,
} from '../../selectors';
import {
	ACTION_TYPE,
	createTodoAsync,
	deleteTodoAsync,
	updateTodoAsync,
} from '../../actions';
import { KEYBOARD, NEW_TODO_ID } from '../../constants';
import styles from './todo.module.css';

export const Todo = ({ id, title, completed }) => {
	const editingTodoId = useSelector(selectEditingTodoId);
	const editingTodoTitle = useSelector(selectEditingTodoTitle);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	const isEditing = id === editingTodoId;

	const onEdit = () => {
		dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id, title } });

		if (id !== NEW_TODO_ID) {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: NEW_TODO_ID });
		}
	};

	const onTitleChange = ({ target }) => {
		dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { title: target.value } });
	};

	const onCompletedChange = ({ target: { checked } }) => {
		dispatch(updateTodoAsync({ id, completed: checked }));
	};

	const onNewTodoSave = () => {
		if (editingTodoTitle.trim() === '') {
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });

			return;
		}

		dispatch(createTodoAsync({ title: editingTodoTitle, completed }));
	};

	const onEditingTodoSave = () => {
		if (editingTodoTitle.trim() === '') {
			onRemove();

			return;
		}

		dispatch(updateTodoAsync({ id, title: editingTodoTitle })).then(() => {
			dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id: null } });
		});
	};

	const onSave = () => {
		if (id === NEW_TODO_ID) {
			onNewTodoSave();
		} else {
			onEditingTodoSave();
		}
	};

	const onRemove = () => {
		dispatch(deleteTodoAsync(id));
	};

	const onTitleKeyDown = ({ key }) => {
		if (key === KEYBOARD.ENTER) {
			onSave();
		} else if (key === KEYBOARD.ESCAPE) {
			dispatch({ type: ACTION_TYPE.EDIT_TODO, payload: { id: null } });

			if (id === NEW_TODO_ID) {
				dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
			}
		}
	};

	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				disabled={isEditing || isLoading}
				checked={completed}
				onChange={onCompletedChange}
			/>
			<div className={styles.title}>
				{isEditing ? (
					<input
						type="text"
						autoFocus={true}
						disabled={isLoading}
						value={editingTodoTitle}
						onChange={onTitleChange}
						onKeyDown={onTitleKeyDown}
					/>
				) : (
					<div onClick={onEdit}>{title}</div>
				)}
			</div>
			<div>
				{isEditing ? (
					<Button onClick={onSave}>✎</Button>
				) : (
					<Button onClick={onRemove}>✖</Button>
				)}
			</div>
		</div>
	);
};
