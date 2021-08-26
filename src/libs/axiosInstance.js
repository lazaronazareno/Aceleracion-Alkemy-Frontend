import { useState } from 'react'

import axios from 'axios'


// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL


const useAxios = () => {
	const access_token = localStorage.getItem('token')
	axios.defaults.headers['authorization'] = access_token

	const [response, setResponse] = useState(null)

	const [error, setError] = useState(null)

	const [loading, setloading] = useState(false)

	const fetchData = ({ url, method, body = null }) => {
		setloading(true)
		console.log({ body })
		axios[method](url, body)

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

	return { response, error, loading, fetchData }
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