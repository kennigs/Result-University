import { ACTION_TYPE } from '.';
import { readTodos } from '../api';

export const readTodosAsync = (searchPhrase, isAlphabetSorting) => (dispatch) => {
    dispatch({type: ACTION_TYPE.LOADING_START});

    return readTodos(searchPhrase, isAlphabetSorting).then((todos) => {
        dispatch({
            type: ACTION_TYPE.SET_TODOS, 
            payload: todos
        });
    }).finally(() => dispatch({type: ACTION_TYPE.LOADING_END}));

}
