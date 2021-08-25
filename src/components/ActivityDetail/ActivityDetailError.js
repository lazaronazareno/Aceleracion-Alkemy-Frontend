import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './styles.css'
import Sweel from '../../shared/Alert/Alert'

export const ActivityDetailError = () => {
  /*eslint indent: "off"*/
  return (
    <>
      <Sweel show={true}
        title={'ERROR'}
        text={'No se encontró la actividad seleccionada'}
        type={'error'}
        onConfirm={'OK'} />
      <Link to='/actividades'>
        <Button variant='secondary'>Ver mas actividades</Button>
      </Link>
    </>
  )
}
