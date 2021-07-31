import React from 'react'
import {Navbar, Nav, Container, Button,Card} from 'react-bootstrap'
import styles from './styles.css'

const Footer = () => {

    // FYI: Data for footer links:
    const infoFooter = [
        {
            title: 'Noticias',
            link: '/#noticias'
        },
        {
            title: 'Actividades',
            link: '/#actividades'
        },
        {
            title: 'Novedades',
            link: '/#novedades'
        },
        {
            title: 'Testimonios',
            link: '/#testimonios'
        },
        {
            title: 'Nosotros',
            link: '/#nosotros'
        },
        {
            title: 'Contacto',
            link: '/#contacto'
        }
    ]
   
    const splitFooterLinks = (array, parts) => {
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
    }

    const infoFooterLinks = splitFooterLinks(infoFooter,2)

    const socialMediahref={
        instagram:'https://www.instagram.com',
        twitter:'https://twitter.com/',
        facebook:'https://facebook.com/',
        whatsapp:'https://web.whatsapp.com/'
    }

    return (
        <> 
         <Card.Footer className='footer'>
            <Navbar bg="light" variant="light" expand='lg'>
                <Container>
                    <div className='column1'>
                    <Nav className='me-auto' variant='monserrat'>
                    { infoFooterLinks[0].map(item => {
                            return (
                                <Nav.Item  key={item.title}  className='links'>
                                    <Nav.Link variant='test' href={`${item.link}`}>{item.title}</Nav.Link>
                                </Nav.Item>
                            )
                        })
                    }
                    </Nav> 
                    </div>
                    <div className='column'>
                    <Navbar.Brand href="/#">
                        <img src='images/assets/logo-header-2.svg' alt='sample-logo'/>
                        <label>   </label>
                        <img src='images/assets/logo-header.svg' alt='logo' />
                    </Navbar.Brand> 
                    </div> 
                    <div className='column' >
                    <Nav className='me-auto' variant='monserrat'>
                        { infoFooterLinks[1].map(item => {
                                return (
                                    <Nav.Item  key={item.title} className='links'>
                                        <Nav.Link variant='test' href={`${item.link}`}>{item.title}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav> 
                    </div>
                    
                </Container>
           </Navbar>
            <hr className='hr'/>
            <div className={styles.links}>
                <a href= {socialMediahref.instagram} >
                <ion-icon name="logo-instagram" size="large" ></ion-icon>   
                </a> 
                <a href={socialMediahref.twitter} >
                <ion-icon name="logo-twitter" size="large" ></ion-icon>   
                </a> 
                <a href={socialMediahref.facebook}>
                <ion-icon name="logo-facebook" size="large"  ></ion-icon>   
                </a> 
                <a href={socialMediahref.whatsapp}>
                <ion-icon name="logo-whatsapp" size="large" ></ion-icon>   
                </a> 
            </div> 
            <p className={styles.p}> 2021 by Alkemy. All rights reserved </p>
            </Card.Footer>
        </>
    )}

export default Footer