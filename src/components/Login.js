import React from 'react';
import axios from 'axios';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Login.css';

const Login = ( props) => {
  const loginUser = (event) =>{
    // event.preventDefault();
    axios.post('http://127.0.0.1:9000/api/v1/login',{name:event.target.name, password:event.target.password}).then(result => {
      console.log(`Messages Returned`);
      console.log(result);
      props.setUser(result);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
      <div className="form"> 
        <WhatsAppIcon />
        <form action="post" onSubmit={(event) => loginUser(event)}>
          <input name="name" type="text" className="form__input" placeholder="Username" />
          <input name="password" type="password" className="form__input" placeholder="*******" />
          <button type="submit"  className="form__button">login</button>
        </form>
      </div>
  )
}

export default Login
