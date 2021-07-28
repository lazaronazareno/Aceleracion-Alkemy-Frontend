import React, { useState } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import './Alert.css';

const SweetAlert = withSwalInstance(swal);
 
const Alert = (props) => {

  const [show, setShow] = useState(false)
  
  const onClickAlert = () => {
    setShow(true)
  }
  const onConfirmAlert = () => {
    setShow(false)
  }

 return (
    <div>
      <button  className='button' onClick={onClickAlert} style={{marginLeft:'5px'}}> {props.buttonText} </button>
      <SweetAlert
        show= {show}
        title ={props.title}
        text= {props.text}
        type= {props.type} //FYI: Choose between 4 built-in icons: 'warning', 'error', 'success' or 'info' 
        onConfirm={onConfirmAlert}
        buttonText = {props.buttonText}
      />
    </div>
  )
}

export default Alert