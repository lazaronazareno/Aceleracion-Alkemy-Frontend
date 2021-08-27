import React, {useEffect} from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import { Header } from './shared/Header'
import Footer from './shared/Footer'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import actions from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Home from './shared/Home/Home'
import NotFound from './shared/testNotFound'
import NewsDetails from './components/NewsDetails'
import { NewList } from './components/NewsList'
import EditUser from './components/editUser/editUser'
import UserProfile from './components/UserProfile'
import Contact from './components/Contact'
import BackofficeActivitiesList from './components/BackofficeActivitiesList'
import BackofficeNewsList from './components/BackofficeNewsList'
import Login from './components/Login/Form'
import Register from './components/Register'
import useAxios from './libs/axiosInstance'

import BackofficeCategories from './components/BackofficeCategories'
import BackofficeHome from './components/BackofficeHome'
import BackofficeContacts from './components/BackofficeContacts'
import BackofficeTestimonials from './components/BackofficeTestimonials'
import { UserList } from './components/UserLists'
import FormNews from './components/NewsForm'
import { ActivityForm } from './components/ActivityForm'
import TestimonialsForm from './components/TestimonialsForm'
import MemberList from './components/MemberList'
import { BackofficeMain } from './components/Backoffice'

function App() {
	const dispatch = useDispatch()
	const { addAuth, addUser } = actions
	const myRoutes = useSelector(state => state.user.routes)
	const components = {
		'/novedades': NewList,
		'/novedades/:id': NewsDetails, 
		'/editUser': EditUser,
		'/user': UserProfile,
		'/contacto': Contact,
		'/nosotros': MemberList,
		'/testimonios': NotFound,
		'/contribuye': NotFound,
		'/backoffice/novedades': BackofficeNewsList,
		'/backoffice/novedades/:id': FormNews,
		'/backoffice/novedades/new': FormNews,
		'/backoffice/actividades': BackofficeActivitiesList,
		'/backoffice/actividades/:id': ActivityForm,
		'/backoffice/inicio': BackofficeHome,
		'/backoffice/contactos': BackofficeContacts,
		'/backoffice/testimonios': BackofficeTestimonials,
		'/backoffice/testimonios/id': TestimonialsForm,
		'/backoffice/categories': BackofficeCategories,
		'/backoffice/usuarios': UserList,
		'/login': Login, 
		'/register': Register,
		'/backoffice': BackofficeMain,
	}
	const httpConfig = {
		url: '/auth/me',
		method: 'get'
	}

	const {response, error, fetchData} = useAxios()

	const getAuthUser = async () => {
		await fetchData(httpConfig)
		/*
			FYI: Here we need sent the request with axios instance.
			For test I use axios dependency directly
		*/
	}

	/*
		FYI: Esto se ejecuta dos veces al momento de hacer login, arreglar en el futuro.
		No compromete a la aplicación en sí, pero la petición aún así se realiza. 
	*/
	useEffect(() => {
		if (localStorage.getItem('token')) {
			getAuthUser()
			dispatch(addAuth(true))
		}
	}, [localStorage.getItem('token')])

	useEffect(() => {
		if (response) {
			dispatch(addUser(response))
		}
	}, [response, error])
	
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
										<Route exact path="/" >
											<Home text='Mensaje de bienvenida de Prueba' />
										</Route>

										<Route exact path='/backoffice/categories' component={BackofficeCategories} />


										{myRoutes.map((route, i) => {
											return (
												<Route key={i} exact path={route} component={components[route]} />
											)
										})}

					
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
