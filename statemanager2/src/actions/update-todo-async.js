import { ACTION_TYPE } from '../actions';
import { updateTodo } from '../api';

export const updateTodoAsync = (todoData) => (dispatch) => {
    dispatch({type: ACTION_TYPE.LOADING_START});

    return updateTodo(todoData).then(() => {
        dispatch({
            type: ACTION_TYPE.UPDATE_TODO, 
            payload: todoData
        });
    }).finally(() => dispatch({type: ACTION_TYPE.LOADING_END}));

}