import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskPage from './components/pages/TaskPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { TodoProvider } from './contexts/TodoContext';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import { useTodoContext } from './contexts/TodoContext';
import './App.css';

const TodoList = () => {
	const [newTodo, setNewTodo] = useState('');
	const { 
		searchQuery, 
		setSearchQuery, 
		sortType, 
		setSortType, 
		addTodo, 
		toggleTodoComplete,
		getFilteredAndSortedTodos 
	} = useTodoContext();
	const { theme, toggleTheme } = useThemeContext();

	const handleAddTodo = async (e) => {
		e.preventDefault();
		if (!newTodo.trim()) return;
		await addTodo(newTodo);
		setNewTodo('');
	};

	const filteredAndSortedTodos = getFilteredAndSortedTodos();

	return (
		<div className="main-page">
			<button className="theme-toggle" onClick={toggleTheme}>
				{theme === 'light' ? '🌙' : '☀️'}
			</button>
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
							onChange={() => toggleTodoComplete(todo.id, todo.completed)}
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
	);
};

function App() {
	return (
		<ThemeProvider>
			<TodoProvider>
				<Router>
					<div className="app">
						<Routes>
							<Route path="/" element={<TodoList />} />
							<Route path="/task/:id" element={<TaskPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</div>
				</Router>
			</TodoProvider>
		</ThemeProvider>
	);
}

export default App;
