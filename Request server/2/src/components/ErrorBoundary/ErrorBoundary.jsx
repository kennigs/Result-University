import { Component } from 'react'
import PropTypes from 'prop-types'

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.error('Error caught by boundary:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<h2>Что-то пошло не так!</h2>
					<p>{this.state.error.message}</p>
				</div>
			)
		}

		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
}
