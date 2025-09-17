import { useSelector, useDispatch } from 'react-redux';
import { selectBoard } from '../../Selectors/board-selectors';
import { boardCellClicked } from '../../Actions/board-actions';

export default function Field() {
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();

  return (
    <div>
      {board.map((row, ri) => (
        <div key={ri}>
          {row.map((cell, ci) => (
            <button key={ci} onClick={() => dispatch(boardCellClicked(ri, ci))}>
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}