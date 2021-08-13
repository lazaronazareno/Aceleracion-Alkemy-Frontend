import { useState, useEffect } from 'react'

import axios from 'axios'

const access_token = localStorage.getItem('token')

axios.defaults.baseURL = process.env.REACT_APP_baseURL

const headers = {'Authorization' : access_token}

const useAxios = ({ url, method, body = null }) => {

	const [response, setResponse] = useState(null)

	const [error, setError] = useState('')

	const [loading, setloading] = useState(true)

	const fetchData = () => {
		axios[method](url, headers, body)

			.then((res) => {

				setResponse(res.data)

			})

			.catch((err) => {

				setError(err)

			})

			.finally(() => {

				setloading(false)

			})

	}


	useEffect(() => {

		fetchData()

	}, [method, url, body, headers])


	return { response, error, loading }

}


export default useAxios


// FYI: asi se debe usar en el component que lo consuma para hacer requests al backend


// const { response, loading, error } = useAxios({

//   method: 'post',

//   url: '/posts',

//   body: JSON.stringify({

//       userId: 1,

//       id: 19392,

//       title: 'title',

//       body: 'Sample text',

//   }),

// });

// const [data, setData] = useState([]);


// useEffect(() => {

//   if (response !== null) {

//       setData(response);

//   }

// }, [response]);