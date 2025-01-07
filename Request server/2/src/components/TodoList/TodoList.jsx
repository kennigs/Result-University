import PropTypes from 'prop-types'
import { TodoItem } from '../TodoItem/TodoItem'

export const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</ul>
	)
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	onToggle: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}
