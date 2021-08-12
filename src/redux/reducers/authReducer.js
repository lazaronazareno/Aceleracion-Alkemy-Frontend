import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
const {addAuth} = actions

const initialState = {
	isAuth: false
}


const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(addAuth, (state, action) => ({...state, ...action.payload}))
})

export default authReducer