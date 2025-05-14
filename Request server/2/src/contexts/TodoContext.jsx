import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState('id-asc');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (title) => {
        try {
            const response = await axios.post('http://localhost:3001/todos', {
                title,
                completed: false
            });
            setTodos([...todos, response.data]);
            return response.data;
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    };

    const toggleTodoComplete = async (todoId, currentStatus) => {
        try {
            await axios.patch(`http://localhost:3001/todos/${todoId}`, {
                completed: !currentStatus
            });
            setTodos(todos.map(todo => 
                todo.id === todoId ? { ...todo, completed: !currentStatus } : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    };

    const updateTodo = async (todoId, updates) => {
        try {
            await axios.patch(`http://localhost:3001/todos/${todoId}`, updates);
            setTodos(todos.map(todo => 
                todo.id === todoId ? { ...todo, ...updates } : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${todoId}`);
            setTodos(todos.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    };

    const sortTodos = (todosToSort) => {
        switch (sortType) {
            case 'id-asc':
                return [...todosToSort].sort((a, b) => Number(a.id) - Number(b.id));
            case 'id-desc':
                return [...todosToSort].sort((a, b) => Number(b.id) - Number(a.id));
            case 'title-asc':
                return [...todosToSort].sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return [...todosToSort].sort((a, b) => b.title.localeCompare(a.title));
            default:
                return todosToSort;
        }
    };

    const getFilteredAndSortedTodos = () => {
        return sortTodos(
            todos.filter(todo => 
                todo.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    const value = {
        todos,
        searchQuery,
        setSearchQuery,
        sortType,
        setSortType,
        addTodo,
        toggleTodoComplete,
        updateTodo,
        deleteTodo,
        getFilteredAndSortedTodos
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}; 