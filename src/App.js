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

function App() {
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
					<Route component={NotFound}/>
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
