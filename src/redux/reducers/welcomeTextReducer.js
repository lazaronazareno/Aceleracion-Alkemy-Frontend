import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const {welcomeTextAction} = actions

const initialState = {
	welcomeText: 'Juntos SOMOS MAS'
}


const welcomeTextReducer = createReducer(initialState, (builder) => {
	builder.addCase(welcomeTextAction, (state, action) => ({...state, ...action.payload}))
})

export default welcomeTextReducer