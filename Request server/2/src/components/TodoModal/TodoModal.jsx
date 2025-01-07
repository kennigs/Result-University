import PropTypes from 'prop-types'
import '../../styles/styles.css'

export const TodoModal = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	value,
	onChange,
	isEditing,
}) => {
	if (!isOpen) return null

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>{isEditing ? 'Изменить задачу' : 'Добавить задачу'}</h2>
				<form onSubmit={onSubmit}>
					<input
						type="text"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder="Введите название задачи"
						className="input"
					/>
					<div className="modal-buttons">
						<button
							type="submit"
							className="submit-button"
						>
							{isEditing ? 'Сохранить' : 'Добавить'}
						</button>
						<button
							type="button"
							onClick={onClose}
							className="cancel-button"
						>
							Отмена
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

TodoModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
}
