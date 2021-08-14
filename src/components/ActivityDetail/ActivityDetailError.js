import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'
import './styles.css'

export const ActivityDetailError = () => {
  /*eslint indent: "off"*/
  return (
    <>
      <Alert variant='danger'>No se encontro la actividad seleccionada</Alert>
      <Link to='/actividades'>
        <Button variant='secondary'>Ver mas actividades</Button>
      </Link>
    </>
  )
}
