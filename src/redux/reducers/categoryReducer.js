import {createReducer} from '@reduxjs/toolkit'

import actions from '../actions'

const {addCategories, deleteCategory} = actions

const initialState = {
	categories: []
}

const categoryReducer = createReducer(initialState, (builder) => {
	builder.addCase(addCategories, (state, action) => ({...state, ...action.payload}))
	builder.addCase(deleteCategory, (state, action) => (
		{...state, categories: state.categories.filter(item => item.id !== action.payload.id)}) )
})

export default categoryReducer
