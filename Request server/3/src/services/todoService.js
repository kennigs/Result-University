import { ref, get, set, update, remove, push } from 'firebase/database'
import { db } from '../firebase/firebase'

const COLLECTION_NAME = 'todos'

export const todoService = {
	async getTodos() {
		try {
			const todosRef = ref(db, COLLECTION_NAME)
			const snapshot = await get(todosRef)

			if (!snapshot.exists()) {
				return []
			}

			const data = snapshot.val()
			return Object.entries(data || {}).map(([id, todo]) => ({
				id,
				title: todo.title,
				completed: todo.completed,
			}))
		} catch (error) {
			console.error('Error fetching todos:', error)
			throw error
		}
	},

	async addTodo(todo) {
		try {
			const todosRef = ref(db, COLLECTION_NAME)
			const newTodoRef = push(todosRef)
			const todoData = {
				title: todo.title,
				completed: todo.completed,
			}
			await set(newTodoRef, todoData)
			return {
				id: newTodoRef.key,
				...todoData,
			}
		} catch (error) {
			console.error('Error adding todo:', error)
			throw error
		}
	},

	async updateTodo(id, todo) {
		try {
			const todoRef = ref(db, `${COLLECTION_NAME}/${id}`)
			await update(todoRef, todo)
			return {
				id,
				...todo,
			}
		} catch (error) {
			console.error('Error updating todo:', error)
			throw error
		}
	},

	async deleteTodo(id) {
		try {
			const todoRef = ref(db, `${COLLECTION_NAME}/${id}`)
			await remove(todoRef)
		} catch (error) {
			console.error('Error deleting todo:', error)
			throw error
		}
	},
}
