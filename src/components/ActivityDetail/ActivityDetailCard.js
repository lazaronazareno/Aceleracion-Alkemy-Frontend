import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './styles.css'

export const ActivityDetailCard = ({ name, content, image }) => {
  /*eslint indent: "off"*/
  return (
    <div className='d-flex justify-content-center'>
      <Card className='shadow'>
        <Card.Img variant='top' src={ image } />
        <Card.Body>
          <Card.Title>
            { name }
          </Card.Title>
          <Card.Text>
            { content }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )

}

ActivityDetailCard.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
