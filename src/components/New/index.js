import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import './styles.css'
import PropTypes from 'prop-types'

export default class New extends Component {

	constructor() {
		super()
		this.state = {
			oneNew: []
		}
	}

	async componentDidMount() {
		const res = await axios.get(`dirección del endpoint/${  this.props.match.params.id}`)
		this.setState({ oneNew: res.data.data })
	}

	render() {
		return (
			<div className="flex-container">
				<div className="row">
					<div className="column">
						<Card key={this.state.oneNew.id}>
							<Card.Img className="imgCard" src={this.state.oneNew.image} />
							<Card.Body className="bodyCard">
								<Card.Title>{this.state.oneNew.title}</Card.Title>
								<Card.Text>{this.state.oneNew.text}</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
		)
	}
}

New.propTypes = {
	match: PropTypes.string.isRequired
}
