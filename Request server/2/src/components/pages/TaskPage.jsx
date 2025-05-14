import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoContext } from '../../contexts/TodoContext';
import './TaskPage.css';

const TaskPage = () => {
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { todos, updateTodo, deleteTodo, toggleTodoComplete } = useTodoContext();

    useEffect(() => {
        const currentTask = todos.find(t => t.id === id);
        if (currentTask) {
            setTask(currentTask);
            setEditedTask(currentTask.title);
        } else {
            navigate('/404');
        }
    }, [id, todos, navigate]);

    const handleEdit = async () => {
        try {
            await updateTodo(id, { title: editedTask });
            setTask({ ...task, title: editedTask });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async () => {
        try {
            await toggleTodoComplete(id, task.completed);
            setTask({ ...task, completed: !task.completed });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (!task) return <div>Загрузка...</div>;

    return (
        <div className="task-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>
            <div className="task-content">
                <div className="task-header">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleComplete}
                        className="task-checkbox"
                    />
                    <h2 className={`task-title ${task.completed ? 'completed' : ''}`}>
                        {task.title}
                    </h2>
                </div>
                {isEditing ? (
                    <div className="edit-mode">
                        <textarea
                            value={editedTask}
                            onChange={(e) => {
                                if (e.target.value.length <= 150) {
                                    setEditedTask(e.target.value);
                                }
                            }}
                            className="edit-textarea"
                            maxLength={150}
                        />
                        <div className="edit-buttons">
                            <button onClick={handleEdit}>Сохранить</button>
                            <button onClick={() => setIsEditing(false)}>Отмена</button>
                        </div>
                    </div>
                ) : (
                    <div className="view-mode">
                        <div className="task-actions">
                            <button onClick={() => setIsEditing(true)}>Редактировать</button>
                            <button onClick={handleDelete} className="delete-button">Удалить</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskPage; 