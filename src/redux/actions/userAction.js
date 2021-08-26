import { createAction } from '@reduxjs/toolkit'

const addUserAction = createAction('user/addUser', (user) => {
	return {
		payload: {
			id: user.id,
			email: user.email,
			firstName:  user.firstName,
			lastName: user.lastName,
			roleId:user.roleId,
			routes: user.routes || []
		}
	}
})


export {
	addUserAction
}