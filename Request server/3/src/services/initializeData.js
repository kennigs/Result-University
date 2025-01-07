import { ref, get, set } from 'firebase/database'
import { db } from '../firebase/firebase'

const initialTodos = {
	todo1: {
		title: 'Изучить React',
		completed: false,
	},
	todo2: {
		title: 'Изучить Firebase',
		completed: false,
	},
}

export const initializeDatabase = async () => {
	try {
		const todosRef = ref(db, 'todos')
		const snapshot = await get(todosRef)

		if (!snapshot.exists()) {
			await set(todosRef, initialTodos)
		}
		return true
	} catch (error) {
		console.error('Error initializing database:', error)
		return false
	}
}
