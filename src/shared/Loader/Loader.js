import React, { useState } from 'react'
import Spinner from 'react-loader-spinner'
import styles from '../../features/counter/Counter.module.css'

const Loader = () => {
	const [loading, setLoading] = useState(false)

	const stateLoading = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 5000)
	}

	if (loading) {
		return <Spinner type="ThreeDots" color="#00BFFF" height={50} width={50} />
	} else {
		return (
			<div>
				<button className={styles.button} onClick={stateLoading} style={{ marginLeft: '4px' }}>
          Loading Component
				</button>
			</div>
		)
	}
}

export default Loader
