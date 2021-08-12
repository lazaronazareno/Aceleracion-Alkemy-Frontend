import { createAction } from '@reduxjs/toolkit'

export const addAuth = createAction('auth/setAuth', (isAuth) => {
	return {
		payload: {
			isAuth: isAuth
		}
	}
})