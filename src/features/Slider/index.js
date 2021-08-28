import Carousel from 'react-bootstrap/Carousel'
import React from 'react'
import { Image } from 'react-bootstrap'
import './styles.css'

// eslint-disable-next-line react/prop-types
const Slider = () => {
	const items = [
		{
			imageUrl: 'https://alkemy-ong.s3-sa-east-1.amazonaws.com/media/slider-4.jpeg',
			title: 'La educación es el arma mas poderosa que puedes usar para cambiar el mundo',
			text: 'Nelson Mandela'
		},
		{
			imageUrl: 'https://alkemy-ong.s3-sa-east-1.amazonaws.com/media/slider-8.jpeg',
			title: 'A los niños se les debe enseñar a pensar, no qué pensar',
			text: 'Margaret Mead'
		}
		
	]
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
