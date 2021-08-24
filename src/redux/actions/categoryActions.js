import { createAction } from '@reduxjs/toolkit'

const addCategories = createAction('categories/addCategories', (categories) => {
	return {
		payload: {
			categories: categories ? categories : []
		}
	}
})

const deleteCategory = createAction('categories/deleteCategory', (id) => {
	return {
		payload: {
			id: id
		}
	}
})

export {
	addCategories, deleteCategory
}