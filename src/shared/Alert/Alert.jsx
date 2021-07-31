import React from 'react';
import SweetAlert from 'sweetalert2-react';
import './Alert.css';

const Alert = (props) => {
  return (
    <div>
      <SweetAlert
        show={props.show}
        title={props.title}
        text={props.text}
        type={props.type} //FYI: Choose between 4 built-in icons: 'warning', 'error', 'success' or 'info'
        onConfirm={props.onConfirm}
      />      
    </div>
  );
};

export default Alert;
