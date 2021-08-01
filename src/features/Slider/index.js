import Carousel from 'react-bootstrap/Carousel'
import React from 'react'
import { Image } from 'react-bootstrap'
import './styles.css'

/*
	format for each item in item list:
	{
		imageUrl: 'url',
		title: 'title',
		text: 'text'
	}
*/

// eslint-disable-next-line react/prop-types
const Slider = ({items=[]}) => {
	
	return (
		<div>
			<Carousel slide>
				{
					items.map((item, i) => {
						return (
							<Carousel.Item key={i}>
								<Image src={item.imageUrl} 
									className='d-block w-100'
									alt={`${i}-slide`}
									thumbnail />
								<Carousel.Caption>
									<h3>{item.title}</h3>
									<p className='infoCarousel'>{item.text}</p>
								</Carousel.Caption>
							</Carousel.Item>
						)
					})
				}
			</Carousel>

		</div>
	)
}
export default Slider
