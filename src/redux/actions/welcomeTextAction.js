import { createAction } from '@reduxjs/toolkit'

const welcomeTextAction = createAction('welcomeText/changeText', (text) => {
	return {
		payload: {
			welcomeText: text
		}
	}
})

export {
	welcomeTextAction
}