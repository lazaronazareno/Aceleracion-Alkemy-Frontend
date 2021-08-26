import React, {useEffect, useState} from 'react'
import Member from '../Member'
import useAxios from '../../libs/axiosInstance'
import { Container, Row, Col } from 'react-bootstrap'
import './styles.css'


const MemberList = () => {
	const {response, error, fetchData} = useAxios()

  
	const [members, setMembers] = useState([])
  
	const httpConfigMembers = {
		url: '/members',
		method: 'get'
	}
  
	const getMembers = async () => {
		await fetchData(httpConfigMembers)
	}
  
	useEffect(() => {
		getMembers()
	},[])

	useEffect(() => {
		if (response) {
			setMembers(response.data)
		}
	}, [response, error])

	return (
		<Container>
			<Row>
				{
					members.map((member, index) => {
						return (
							<Col key={index} md={3}>
								<Member  name={member.name} image={member.image} />
							</Col>
						)
					})
				}
			</Row>
		</Container>
	)
}

export default MemberList
