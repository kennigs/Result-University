import PropTypes from 'prop-types'
import '../../styles/styles.css'

export const SearchBar = ({ value, onChange }) => {
	return (
		<div className="search-container">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Поиск задач..."
				className="search-input"
			/>
		</div>
	)
}

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}
