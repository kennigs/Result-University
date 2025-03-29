import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import TaskPage from './components/pages/TaskPage';
import NotFoundPage from './components/pages/NotFoundPage';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortType, setSortType] = useState('id-asc');
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		fetchTodos();
		// Проверяем сохраненную тему
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
	};

	const fetchTodos = async () => {
		try {
			const response = await axios.get('http://localhost:3001/todos');
			setTodos(response.data);
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};

	const handleAddTodo = async (e) => {
		e.preventDefault();
		if (!newTodo.trim()) return;

		try {
			const response = await axios.post('http://localhost:3001/todos', {
				title: newTodo,
				completed: false
			});
			setTodos([...todos, response.data]);
			setNewTodo('');
		} catch (error) {
			console.error('Error adding todo:', error);
		}
	};

	const handleToggleComplete = async (todoId, currentStatus) => {
		try {
			await axios.patch(`http://localhost:3001/todos/${todoId}`, {
				completed: !currentStatus
			});
			setTodos(todos.map(todo => 
				todo.id === todoId ? { ...todo, completed: !currentStatus } : todo
			));
		} catch (error) {
			console.error('Error updating todo:', error);
		}
	};

	const sortTodos = (todos) => {
		switch (sortType) {
			case 'id-asc':
				return [...todos].sort((a, b) => Number(a.id) - Number(b.id));
			case 'id-desc':
				return [...todos].sort((a, b) => Number(b.id) - Number(a.id));
			case 'title-asc':
				return [...todos].sort((a, b) => a.title.localeCompare(b.title));
			case 'title-desc':
				return [...todos].sort((a, b) => b.title.localeCompare(a.title));
			default:
				return todos;
		}
	};

	const filteredAndSortedTodos = sortTodos(
		todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	return (
		<Router>
			<div className="app">
				<button className="theme-toggle" onClick={toggleTheme}>
					{theme === 'light' ? '🌙' : '☀️'}
				</button>
				<Routes>
					<Route path="/" element={
						<div className="main-page">
							<h1>Список задач</h1>
							<form onSubmit={handleAddTodo} className="add-todo-form">
								<input
									type="text"
									value={newTodo}
									onChange={(e) => {
										if (e.target.value.length <= 150) {
											setNewTodo(e.target.value);
										}
									}}
									placeholder="Добавить новую задачу (макс. 150 символов)"
									className="todo-input"
									maxLength={150}
								/>
								<button type="submit" className="add-button">Добавить</button>
							</form>
							<div className="controls">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Поиск задач..."
									className="search-input"
								/>
								<select
									value={sortType}
									onChange={(e) => setSortType(e.target.value)}
									className="sort-select"
								>
									<option value="id-asc">По ID (возрастание)</option>
									<option value="id-desc">По ID (убывание)</option>
									<option value="title-asc">По алфавиту (А-Я)</option>
									<option value="title-desc">По алфавиту (Я-А)</option>
								</select>
							</div>
							<div className="todos-list">
								{filteredAndSortedTodos.map(todo => (
									<div key={todo.id} className="todo-item">
										<input
											type="checkbox"
											checked={todo.completed}
											onChange={() => handleToggleComplete(todo.id, todo.completed)}
											className="todo-checkbox"
										/>
										<Link to={`/task/${todo.id}`} className="todo-link">
											<p className={`todo-text ${todo.completed ? 'completed' : ''}`}>
												{todo.title}
											</p>
										</Link>
									</div>
								))}
							</div>
						</div>
					} />
					<Route path="/task/:id" element={<TaskPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
