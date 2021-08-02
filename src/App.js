import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TestApp from './shared/testApp'
import NotFound from './shared/testNotFound'
import './App.css'
import Home from './shared/Home/Home'
import { Header } from './shared/Header'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" >
						<Home text='Mensaje de bienvenida de Prueba'/>
					</Route>
					<Route exact path="/test" component={TestApp} />
					<Route component={NotFound}/>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
