import PropTypes from 'prop-types'
import { memo } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import '../../styles/styles.css'

export const TodoItem = memo(({ todo, onToggle, onEdit, onDelete }) => {
	const handleToggle = () => onToggle(todo.id)
	const handleEdit = () => onEdit(todo)
	const handleDelete = () => onDelete(todo.id)

	return (
		<li className="todo-item">
			<label className="todo-content">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={handleToggle}
					className="todo-checkbox"
				/>
				<span
					className={
						todo.completed ? 'todo-text completed' : 'todo-text'
					}
				>
					{todo.title}
				</span>
			</label>
			<div className="todo-actions">
				<button
					className="button"
					onClick={handleEdit}
				>
					<FaEdit />
				</button>
				<button
					className="button"
					onClick={handleDelete}
				>
					<FaTrash />
				</button>
			</div>
		</li>
	)
})

TodoItem.displayName = 'TodoItem'

TodoItem.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}).isRequired,
	onToggle: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}
