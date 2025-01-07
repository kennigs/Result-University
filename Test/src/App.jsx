import { useEffect, useState } from 'react'

export const App = () => {
	const [products, setProducts] = useState([])
	const [refreshProducts, setRefreshProducts] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		fetch('http://localhost:3001/products')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts)
			})
			.finally(() => setIsLoading(false))
	}, [refreshProducts])

	const requestAddVacuumCleaner = () => {
		setIsCreating(true)

		fetch('http://localhost:3001/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Пылесос',
				price: 4690,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Пылесос добавлен, ответ сервера:', response)
				setRefreshProducts(!refreshProducts)
			})
	}
	const requestUpadateSmartphone = () => {
		setIsUpdating(true)
		fetch('http://localhost:3001/products/2', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: 'Смартфон',
				price: 17990,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Смартфон обновлен:', data)
				setRefreshProducts(!refreshProducts)
			})
			.finally(() => setIsUpdating(false))
	}
	const deleteThirdProduct = () => {
		setIsDeleting(true)
		fetch('http://localhost:3001/products/3', {
			method: 'DELETE',
		})
			.then((a) => a.json())
			.then((a) => {
				console.log('Третий продукт удален')
				setRefreshProducts(!refreshProducts)
			})
			.finally(() => setIsDeleting(false))
	}

	return (
		<div className="app">
			{isLoading ? (
				<div className="loader"></div>
			) : (
				products.map(({ id, name, price }) => (
					<div
						key={id}
						className="app"
					>
						{name} - {price} руб
					</div>
				))
			)}
			<button
				disabled={isCreating}
				onClick={requestAddVacuumCleaner}
			>
				Добавить пылесос
			</button>
			<button
				disabled={isUpdating}
				onClick={requestUpadateSmartphone}
			>
				Обновить смартфон
			</button>
			<button
				disabled={isDeleting}
				onClick={deleteThirdProduct}
			>
				Удалить третий продукт
			</button>
		</div>
	)
}

export default App
