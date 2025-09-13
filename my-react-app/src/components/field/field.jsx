import { FieldLayout } from './field-layout.jsx';
import { store } from '../../store';
import { handleCellClick } from '../../handlers/handle-cell-click';

export const Field = () => {
	const { field } = store.getState();
	
	return <FieldLayout field={field} handleCellClick={handleCellClick} />;
};
