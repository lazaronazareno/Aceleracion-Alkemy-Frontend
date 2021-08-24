import { createAction } from '@reduxjs/toolkit'

const addCategories = createAction('categories/addCategories', (categories) => {
	return {
		payload: {
			categories: categories
		}
	}
})

export {
	addCategories
}