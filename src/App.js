import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NotFound from './shared/testNotFound'
import './App.css'
import Home from './shared/Home/Home'
import { Header } from './shared/Header'
import { NewList } from './components/NewsList'
import Login from './components/Login/Form'
import Footer from './shared/Footer'
import Register from './components/Register'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import NewsDetails from './components/NewsDetails'
import EditUser from './components/editUser/editUser'
import UserProfile from './components/UserProfile'
import actions from './redux/actions'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import BackofficeNewsList from './components/BackofficeNewsList'
import FormNews from './components/NewsForm'
import BackofficeContacts from './components/BackofficeContacts/index'
import BackofficeActivitiesList from './components/BackofficeActivitiesList/index'
import Contact from './components/Contact'
import { UserList } from './components/UserLists'
import BackofficeTestimonials from './components/BackofficeTestimonials'
import BackofficeHome from './components/BackofficeHome'

function App() {
	const dispatch = useDispatch()
	const { addAuth, addUser } = actions

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
				<Route
					render={({ location }) => (
						<TransitionGroup >
							<CSSTransition
								appear={true}
								key={location.key}
								timeout={{ enter: 600, exit: 400 }}
								classNames="fade"
							>
								<div>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route exact path='/login' component={Login} />
										<Route exact path='/register' component={Register} />
										<Route exact path="/test" component={FormNews} />
										<Route exact path="/novedades" component={NewList} />
										<Route exact path="/novedades/:id" component={NewsDetails} />
										<Route exact path="/editUser" component={EditUser} />
										<Route exact path="/user" component={UserProfile} />
										<Route exact path='/backoffice/novedades' component={BackofficeNewsList} />	
										<Route exact path='/backoffice/contacts' component={BackofficeContacts} />	
										<Route exact path='/backoffice/actividades' component={BackofficeActivitiesList} />
										<Route exact path='/contacto' component={Contact} />	
										<Route exact path='/backoffice/usuarios' component={UserList} />	
										<Route exact path='/backoffice/testimonios' component={BackofficeTestimonials} />	
										<Route exact path='/backoffice/inicio' component={BackofficeHome} />	
										<Route component={NotFound} />
									</Switch>
								</div>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
