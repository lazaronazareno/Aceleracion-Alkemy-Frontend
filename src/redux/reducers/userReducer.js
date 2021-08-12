import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const {addUser} = actions

const initialState = {
	id: '',
	email:'',
	firstName: '',
	lastName: ''
}

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(addUser, (state, action) => ({...state, ...action.payload}))
})

export default userReducer