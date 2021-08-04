import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TestApp from './shared/testApp'
import NotFound from './shared/testNotFound'
import './App.css'
import Home from './shared/Home/Home'
import { Header } from './shared/Header'
import NewList from './components/NewsList'

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
					<Route exact path="/novedades" component={NewList} />
					<Route component={NotFound}/>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
