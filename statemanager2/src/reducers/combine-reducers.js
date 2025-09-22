import { combineReducers } from "redux";
import { editingTodoReducer } from "./editing-todo-reducer";
import { optionsReducer } from "./options-reducer";
import { todosReducer } from "./todos-reducer";

export const reducer = combineReducers({
    editingTodoState: editingTodoReducer,
    optionsState: optionsReducer,
    todosState: todosReducer,
})