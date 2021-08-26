import {addAuth} from './authAction'
import {addUserAction} from './userAction'
import { welcomeTextAction } from './welcomeTextAction'
import {addCategories, deleteCategory} from './categoryActions'

export default {
	addAuth,
	addUser: addUserAction,
	welcomeTextAction: welcomeTextAction,
	addCategories,
	deleteCategory
}