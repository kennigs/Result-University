import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyAJyvYv2WB1OZvgPg4uEqwBzJphuQIgnJU',
	authDomain: 'request-to-the-server-task-3.firebaseapp.com',
	databaseURL:
		'https://request-to-the-server-task-3-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'request-to-the-server-task-3',
	storageBucket: 'request-to-the-server-task-3.firebasestorage.app',
	messagingSenderId: '22355101373',
	appId: '1:22355101373:web:e974dfe171947295d699d4',
	measurementId: 'G-1MFVSWN5HB',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getDatabase(app)

export { db }
