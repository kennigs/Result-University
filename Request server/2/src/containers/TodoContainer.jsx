import { useState, useEffect, useCallback, useMemo } from 'react'
import { TodoView } from '../components/TodoView'
import { todosApi } from '../api/todosApi'

export const TodoContainer = () => {
	const [todos, setTodos] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [editingTodo, setEditingTodo] = useState(null)
	const [sortOrder, setSortOrder] = useState('asc')
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		let isMounted = true

		const fetchTodos = async () => {
			try {
				const data = await todosApi.getTodos()
				if (isMounted) {
					setTodos(data)
				}
			} catch (error) {
				console.error('Failed to fetch todos:', error)
			}
		}

		fetchTodos()
		return () => {
			isMounted = false
		}
	}, [])

	const toggleTodo = useCallback(
		async (id) => {
			try {
				const todo = todos.find((t) => t.id === id)
				const updatedTodo = { ...todo, completed: !todo.completed }
				await todosApi.updateTodo(id, updatedTodo)
				setTodos((prevTodos) =>
					prevTodos.map((t) => (t.id === id ? updatedTodo : t)),
				)
			} catch (error) {
				console.error('Failed to toggle todo:', error)
			}
		},
		[todos],
	)

	const startEditing = useCallback((todo) => {
		setEditingTodo(todo)
		setNewTodoTitle(todo.title)
		setIsModalOpen(true)
	}, [])

	const deleteTodo = useCallback(async (id) => {
		try {
			await todosApi.deleteTodo(id)
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
		} catch (error) {
			console.error('Failed to delete todo:', error)
		}
	}, [])

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault()
			if (!newTodoTitle.trim()) return

			try {
				if (editingTodo) {
					const updatedTodo = { ...editingTodo, title: newTodoTitle }
					await todosApi.updateTodo(editingTodo.id, updatedTodo)
					setTodos((prevTodos) =>
						prevTodos.map((todo) =>
							todo.id === editingTodo.id ? updatedTodo : todo,
						),
					)
				} else {
					const newTodo = {
						id: Date.now().toString(),
						title: newTodoTitle,
						completed: false,
					}
					const addedTodo = await todosApi.addTodo(newTodo)
					setTodos((prevTodos) => [...prevTodos, addedTodo])
				}

				setIsModalOpen(false)
				setNewTodoTitle('')
				setEditingTodo(null)
			} catch (error) {
				console.error('Failed to submit todo:', error)
			}
		},
		[editingTodo, newTodoTitle],
	)

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
