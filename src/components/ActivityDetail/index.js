import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActivityDetailCard } from './ActivityDetailCard'
import { ActivityDetailError } from './ActivityDetailError'

export const ActivityDetail = () => {
  /*eslint indent: "off"*/
  const { id } = useParams()

  const [ content, setContent ] = useState([])

  
  // Cuando este el endo-point en el rest modificar este useEffect
  useEffect(() => {
    setContent([
      {
        name: 'Titulo de la actividad 0',
        content: 'texto que se muestra en el cuerpo de la actividad',
        image: 'https://miposicionamientoweb.es/wp-content/uploads/2017/02/qu%C3%A9-es-un-blog-y-para-qu%C3%A9-sirve-todo-sobre-blogging.png'
      },
      {
        name: 'Titulo de la actividad 1',
        content: 'texto que se muestra en el cuerpo de la actividad',
        image: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2019/05/blogger-1-1024x538.png'
      },
      {
        name: 'Titulo de la actividad 2',
        content: 'texto que se muestra en el cuerpo de la actividad',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm0e6vnqixWfKQZTlkIBGfVCY-XYqU58ZQakpDyX8NX0Db0zo9kbTPO4LbmMcX1JWFo0c&usqp=CAU'
      },
      {
        name: 'Titulo de la actividad 3',
        content: 'texto que se muestra en el cuerpo de la actividad',
        image: 'https://miposicionamientoweb.es/wp-content/uploads/2017/02/qu%C3%A9-es-un-blog-y-para-qu%C3%A9-sirve-todo-sobre-blogging.png'
      },
    ])
  }, [id])
  
  
  return (
    <>
      { 
        content[ id ] 
          ? <ActivityDetailCard {...content[ id ]}/> 
          : <ActivityDetailError /> 
      }
    </>
  )
}
