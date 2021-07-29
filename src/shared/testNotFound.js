import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './testStyles.scss';

function testNotFound() {
    return (
        <Container>
            <Alert className="d-flex flex-column yellow align-items-center fs-1">PAGE NOT FOUND
              <Link to="/">
                <Button className="red" variant="danger" size="lg">Back</Button>
              </Link>
            </Alert>
        </Container>
    )
}

export default testNotFound
