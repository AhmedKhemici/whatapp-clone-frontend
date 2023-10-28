import React, { useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ( props) => {
  const loginUser = (event) =>{
    event.default();
    axios.post('http://127.0.0.1:9000/api/v1/login',{name:event.target.name, password:event.target.password}).then(result => {
      console.log(`Messages Returned`);
      console.log(result);
      props.setUser(result);
    }).catch(err => {
      console.log(err);
    });
  }
  return (   
      <form action="" className="form">
        <input name="name" type="text" className="form__input" placeholder="Username" />
        <input name="password" type="password" className="form__input" placeholder="*******" />
        <button type="submit" onSubmit={() => loginUser} className="form__button"></button>
      </form>
  )
}

export default Login
