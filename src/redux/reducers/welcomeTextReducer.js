import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const {welcomeTextAction} = actions

const initialState = {
	welcomeText: 'Texto de Bienvenida'
}


const welcomeTextReducer = createReducer(initialState, (builder) => {
	builder.addCase(welcomeTextAction, (state, action) => ({...state, ...action.payload}))
})

export default welcomeTextReducer