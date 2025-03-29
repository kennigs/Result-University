import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
    );
};

export default NotFoundPage; 