import React from 'react'
import { Table, Button } from 'react-bootstrap'

import './styles.css'

/*eslint indent: "off"*/
export const UserListTable = ({ users }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-3">Nombre</th>
            <th className="col-3">Apellido</th>
            <th className="col-4">Email</th>
            <th className="col-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map( (user, i) => (
              <tr key={ i }>
                <td>{ user.firstName}</td>
                <td>{ user.lastName }</td>
                <td>{ user.email }</td>
                <td>
                  <Button variant="primary"  size="sm" className="mx-1">Editar</Button>
                  <Button variant="danger"  size="sm" className="mx-1">Eliminar</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}
