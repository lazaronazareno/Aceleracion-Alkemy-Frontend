import { createAction } from '@reduxjs/toolkit'

const addNews = createAction('news/addNews', (news) => {
	return {
		payload: {
			news: news ? news : []
		}
	}
})

const addNewDetails = createAction('news/newDetails', (id) => {
	return {
		payload: {
			id: id
		}
	}
})

const deleteNew = createAction('news/deleteNew', (id) => {
	return {
		payload: {
			id: id
		}
	}
})

export {
	addNews,
	addNewDetails,
	deleteNew
}