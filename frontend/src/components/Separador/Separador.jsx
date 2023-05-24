import React from 'react'
import './Separador.css'

export const Separador = (props) => {
  return (
    <div style={{marginTop: props.height || "40px", width: "100%"}} className='separador'>
    </div>
  )
}
