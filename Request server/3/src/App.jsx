import { lazy, Suspense } from 'react'
import { TodoContainer } from './containers/TodoContainer'
import { Loader } from './components/Loader'
import './styles/styles.css'
import './App.css'

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<TodoContainer />
		</Suspense>
	)
}

export default App
