import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from './game.jsx';
import { store } from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Функция для рендера
const renderApp = () => {
    root.render(
        <React.StrictMode>
            <Game />
        </React.StrictMode>
    );
};

// Подписка на изменения store
store.subscribe(renderApp);

// Начальный рендер
renderApp();

