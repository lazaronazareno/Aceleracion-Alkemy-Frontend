import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import reducers from '../redux/reducers'

export default configureStore({
	reducer: {
		counter: counterReducer,
		user: reducers.userReducer,
		auth: reducers.authReducer
	},
})
