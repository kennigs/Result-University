import './App.css'
import { useEffect, useState } from 'react'

function App() {
	const [todos, setTodos] = useState([])

	const toggleTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		)
	}

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((json) => setTodos(json))
	}, [])
	return (
		<>
			<h1>Todo List</h1>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
						/>
						{todo.title}
					</li>
				))}
			</ul>
		</>
	)
}

export default App
