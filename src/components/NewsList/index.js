import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { Card, Col, Row, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

/* eslint indent:"off" */
export const NewList  = () => {

  const [news, setNews] = useState([])

  useEffect( () => {

    const config = {
      url: '/news',
      method: 'get',
      baseURL: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }

    axios.request(config).then( ({ data }) => setNews(data.entries) )

  },[])
  
  return(
    <>
      <Container>
        <Row>
          {
            news.map( ({id, name, image, createdAt } ) => {
              return(
                  <Col md={4} key={id}>
                    <Card className="shadow">
                      <Card.Img variant="top" src={ image } />
                      <Card.Body>
                        <Card.Title className="left">{name}</Card.Title>
                        <Card.Text className="left date">Creado el { Moment(createdAt).format('DD-MM-YYYY')}</Card.Text>
                        <Link className="btn btn-primary" to={`/novedades/${id}`}>See news in detail</Link>
                      </Card.Body>
                    </Card>
                  </Col>
              )
            })
          }
        </Row>
      </Container>
    </>
  )
}