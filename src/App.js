import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TestApp from './shared/testApp'
import NotFound from './shared/testNotFound'
import './App.css'
import Home from './shared/Home/Home'
import { Header } from './shared/Header'
import { NewList } from './components/NewsList'
import Login from './components/Login/Form'
import Footer from './shared/Footer'
import Register from './components/Register'
import NewsDetails from './components/NewsDetails'
import EditUser from './components/editUser/editUser'
import UserProfile from './components/UserProfile'
import actions from './redux/actions'
import {useDispatch} from 'react-redux'
import axios from 'axios'

function App() {
	const dispatch = useDispatch()
	const {addAuth, addUser} = actions

	const getAuthUser = async () => {
		const user = await axios.get('http://localhost:4000/auth/me', {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})
		/*
			FYI: Here we need sent the request with axios instance.
			For test I use axios dependency directly
		*/
		
		dispatch(addUser(user.data))
	}

	if (localStorage.getItem('token')) {
		dispatch(addAuth(true))
		getAuthUser()
	}

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" >
						<Home text='Mensaje de bienvenida de Prueba'/>
					</Route>
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path="/test" component={TestApp} />
					<Route exact path="/novedades" component={NewList} />
					<Route exact path="/novedades/:id" component={NewsDetails} />
					<Route exact path="/editUser" component={EditUser} />
					<Route exact path="/user" component={UserProfile} />
					<Route exact path='/register' component={Register} />
					<Route component={NotFound}/>
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
