import React, { useState } from 'react'
import logo from './logo.svg'
import { Counter } from './features/counter/Counter'
import './App.css'
import Alert from './shared/Alert/Alert'

function App() {
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false)
	const [showInfo, setShowInfo] = useState(false)

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Counter />
				<p>
          Edit <code>src/App.js</code> and save to reload.
				</p>
				<span>
					<span>Learn </span>
					<a
						className="App-link"
						href="https://reactjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
            React
					</a>
					<span>, </span>
					<a
						className="App-link"
						href="https://redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
            Redux
					</a>
					<span>, </span>
					<a
						className="App-link"
						href="https://redux-toolkit.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
            Redux Toolkit
					</a>
          ,<span> and </span>
					<a
						className="App-link"
						href="https://react-redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
            React Redux
					</a>
				</span>
				<button className="button" onClick={() => setShowError(true)}>
					{' '}
          Error Button{' '}
				</button>
				<Alert
					show={showError}
					title="Oops"
					text="Something went wrong"
					type="error"
					onConfirm={() => setShowError(false)}
				/>
				<button className="button" onClick={() => setShowSuccess(true)}>
					{' '}
          Success Button{' '}
				</button>
				<Alert
					show={showSuccess}
					title="Good Job!"
					text="You clicked the button"
					type="success"
					onConfirm={() => setShowSuccess(false)}
				/>
				<button className="button" onClick={() => setShowInfo(true)}>
					{' '}
          Info Button{' '}
				</button>
				<Alert
					show={showInfo}
					title="Info"
					text="You clicked the button"
					type="info"
					onConfirm={() => setShowInfo(false)}
				/>
			</header>
		</div>
	)
}

export default App
