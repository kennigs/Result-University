import PropTypes from 'prop-types'
import { FaPlus } from 'react-icons/fa'
import { TodoList } from './TodoList/TodoList'
import { TodoModal } from './TodoModal/TodoModal'
import { SearchBar } from './SearchBar/SearchBar'
import '../styles/styles.css'
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary'
import { Loader } from './Loader/Loader'

export const TodoView = ({
	todos,
	isModalOpen,
	newTodoTitle,
	editingTodo,
	sortOrder,
	searchQuery,
	onToggle,
	onEdit,
	onDelete,
	onSubmit,
	onModalClose,
	onAddClick,
	onSortChange,
	onSearchChange,
	onTitleChange,
	isLoading,
	error,
}) => {
	if (error) {
		return <div className="error">Error: {error}</div>
	}

	return (
		<ErrorBoundary>
			<div className="container">
				<div className="header">
					<h1>Todo List</h1>
					<button
						className="button"
						onClick={onAddClick}
					>
						<FaPlus />
					</button>
					<button
						className="button"
						onClick={onSortChange}
					>
						{sortOrder === 'asc' ? '↓ А-Я' : '↑ Я-А'}
					</button>
				</div>

				<SearchBar
					value={searchQuery}
					onChange={onSearchChange}
				/>

				{isLoading ? (
					<Loader />
				) : (
					<TodoList
						todos={todos}
						onToggle={onToggle}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}

				<TodoModal
					isOpen={isModalOpen}
					onClose={onModalClose}
					onSubmit={onSubmit}
					title={newTodoTitle}
					value={newTodoTitle}
					onChange={onTitleChange}
					isEditing={!!editingTodo}
				/>
			</div>
		</ErrorBoundary>
	)
}

TodoView.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	isModalOpen: PropTypes.bool.isRequired,
	newTodoTitle: PropTypes.string.isRequired,
	editingTodo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}),
	sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
	searchQuery: PropTypes.string.isRequired,
	onToggle: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onModalClose: PropTypes.func.isRequired,
	onAddClick: PropTypes.func.isRequired,
	onSortChange: PropTypes.func.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	onTitleChange: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	error: PropTypes.string,
}
