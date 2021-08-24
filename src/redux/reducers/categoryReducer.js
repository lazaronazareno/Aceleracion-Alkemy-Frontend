import {createReducer} from '@reduxjs/toolkit'

import actions from '../actions'

const {addCategories} = actions

const initialState = {
	categories: []
}

const categoryReducer = createReducer(initialState, (builder) => {
	builder.addCase(addCategories, (state, action) => ({...state, ...action.payload}))
})

export default categoryReducer
