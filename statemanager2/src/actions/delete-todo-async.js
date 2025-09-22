import { ACTION_TYPE } from '../actions';
import { deleteTodo } from '../api';

export const deleteTodoAsync = (todoId) => (dispatch) => {
    dispatch({type: ACTION_TYPE.LOADING_START});

    return deleteTodo(todoId).then(() => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO, 
            payload: todoId
        });
    }).finally(() => dispatch({type: ACTION_TYPE.LOADING_END}));

    }