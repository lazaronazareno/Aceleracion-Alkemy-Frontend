import {createReducer} from '@reduxjs/toolkit'

import actions from '../actions'

const {addNews, addNewDetails, deleteNew} = actions

const initialState = {
	news: []
}

const newsReducer = createReducer(initialState, (builder) => {
	builder.addCase(addNews, (state, action) => ({...state, ...action.payload}))
	builder.addCase(addNewDetails, (state, action) => (
		{...state, news: state.news.filter(item => item.id === action.payload.id)}) )
	builder.addCase(deleteNew, (state, action) => (
		{...state, news: state.news.filter(item => item.id !== action.payload.id)}) )
})

export default newsReducer
