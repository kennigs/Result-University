const BASE_URL = 'http://localhost:3001'

export const todosApi = {
	getTodos: () => fetch(`${BASE_URL}/todos`).then((res) => res.json()),

	addTodo: (todo) =>
		fetch(`${BASE_URL}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		}).then((res) => res.json()),

	updateTodo: (id, todo) =>
		fetch(`${BASE_URL}/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		}).then((res) => res.json()),

	deleteTodo: (id) =>
		fetch(`${BASE_URL}/todos/${id}`, {
			method: 'DELETE',
		}).then((res) => res.json()),
}
