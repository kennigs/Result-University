import { useState, useEffect, useCallback, useMemo } from 'react'
import { TodoView } from '../components/TodoView'
import { todoService } from '../services/todoService'
import { initializeDatabase } from '../services/initializeData'

export const TodoContainer = () => {
	const [todos, setTodos] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [editingTodo, setEditingTodo] = useState(null)
	const [sortOrder, setSortOrder] = useState('asc')
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchTodos = async () => {
			setIsLoading(true)
			setError(null)

			try {
				console.log('Starting initialization...')
				await initializeDatabase()
				console.log('Initialization complete')

				console.log('Fetching todos...')
				const data = await todoService.getTodos()
				console.log('Fetched data:', data)

				setTodos(Array.isArray(data) ? data : [])
			} catch (err) {
				const errorMessage = err.message || 'Ошибка при загрузке задач'
				setError(errorMessage)
				console.error('Detailed error in fetchTodos:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTodos()
	}, [])

	const toggleTodo = useCallback(
		async (id) => {
			try {
				const todo = todos.find((t) => t.id === id)
				const updatedTodo = { ...todo, completed: !todo.completed }
				await todoService.updateTodo(id, updatedTodo)
				setTodos((prevTodos) =>
					prevTodos.map((t) => (t.id === id ? updatedTodo : t)),
				)
			} catch (err) {
				setError('Ошибка при обновлении задачи')
				console.error(err)
			}
		},
		[todos],
	)

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			if (!newTodoTitle.trim()) return

			try {
				if (editingTodo) {
					const updatedTodo = {
						title: newTodoTitle,
						completed: editingTodo.completed,
					}
					const result = await todoService.updateTodo(
						editingTodo.id,
						updatedTodo,
					)
					setTodos((prevTodos) =>
						prevTodos.map((todo) =>
							todo.id === editingTodo.id ? result : todo,
						),
					)
				} else {
					const newTodo = {
						title: newTodoTitle,
						completed: false,
					}
					const addedTodo = await todoService.addTodo(newTodo)
					setTodos((prevTodos) => [...prevTodos, addedTodo])
				}

				setIsModalOpen(false)
				setNewTodoTitle('')
				setEditingTodo(null)
			} catch (err) {
				setError('Ошибка при сохранении задачи')
				console.error(err)
			}
		},
		[editingTodo, newTodoTitle],
	)

	const deleteTodo = useCallback(async (id) => {
		try {
			await todoService.deleteTodo(id)
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
		} catch (err) {
			setError('Ошибка при удалении задачи')
			console.error(err)
		}
	}, [])

	const startEditing = useCallback((todo) => {
		setEditingTodo(todo)
		setNewTodoTitle(todo.title)
		setIsModalOpen(true)
	}, [])

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false)
		setEditingTodo(null)
		setNewTodoTitle('')
	}, [])

	const handleAddClick = useCallback(() => {
		setIsModalOpen(true)
		setEditingTodo(null)
		setNewTodoTitle('')
	}, [])

	const filteredAndSortedTodos = useMemo(() => {
		return [...todos]
			.filter((todo) =>
				todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
			)
			.sort((a, b) => {
				if (sortOrder === 'asc') {
					return a.title.localeCompare(b.title)
				} else {
					return b.title.localeCompare(a.title)
				}
			})
	}, [todos, searchQuery, sortOrder])

	return (
		<TodoView
			todos={filteredAndSortedTodos}
			isModalOpen={isModalOpen}
			newTodoTitle={newTodoTitle}
			editingTodo={editingTodo}
			sortOrder={sortOrder}
			searchQuery={searchQuery}
			isLoading={isLoading}
			error={error}
			onToggle={toggleTodo}
			onEdit={startEditing}
			onDelete={deleteTodo}
			onSubmit={handleSubmit}
			onModalClose={handleModalClose}
			onAddClick={handleAddClick}
			onSortChange={() =>
				setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
			}
			onSearchChange={setSearchQuery}
			onTitleChange={setNewTodoTitle}
		/>
	)
}
