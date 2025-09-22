export const selectTodos = ({ todosState }) => todosState;

export const selectSearchInput = ({ optionsState }) => optionsState.searchInput;

export const selectSearchPhrase = ({ optionsState }) => optionsState.searchPhrase;

export const selectIsAlphabetSorting = ({ optionsState }) => optionsState.isAlphabetSorting;

export const selectIsLoading = ({ optionsState }) => optionsState.isLoading;

export const selectEditingTodoId = ({ editingTodoState }) => editingTodoState.id;

export const selectEditingTodoTitle = ({ editingTodoState }) => editingTodoState.title;
