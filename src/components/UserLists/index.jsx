import React, { useEffect, useState } from 'react'
import useAxios from '../../libs/axiosInstance'
import Loader from '../../shared/Loader/Loader'

import { UserListTable } from './UserListTable'

const httpConfig = {
	url: '/users',
	method_get: 'get'
}

/*eslint indent: "off"*/
export const UserList = () => {

  const { response, error, loading, fetchData } = useAxios()


  const [users, setUsers] = useState([{
    firstName:'',
    lastName: '',
    email: ''
  }])

  useEffect(() => {
		if (!loading && response) {
      setUsers( response.data )
		}
	},[loading, response, error])

  useEffect(() => {
		fetchData({ url: httpConfig.url, method: httpConfig.method_get })
  },[])


  return (
    <div className="container">
      <h1 className="my-3">Listado de usuario registrados</h1>

      {
        loading 
          ? <Loader />
          : <UserListTable users={ users }/>
      }
      
    </div> 
  )
}
