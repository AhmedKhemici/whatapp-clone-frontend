import React from 'react';
import axios from 'axios';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Login.css';

const Login = ( props) => {
  const loginUser = (event) =>{
    event.preventDefault();
    const fd = new FormData(event.target);
    const data  = Object.fromEntries(fd.entries());
    axios.post('http://127.0.0.1:9000/api/v1/login',data).then(result => {
      props.login(result.data.user);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
      <div className="form"> 
        <WhatsAppIcon />
        <form action="post" onSubmit={(event) => loginUser(event)}>
          <div className="form__data">
            <div className="form__inputValid">
              <input name="name" type="text" className="form__input" placeholder="Username" />
            </div>
            <div className="form__inputValid">
              <input name="password" type="password" className="form__input" placeholder="*********" />
            </div>
            <button type="submit"  className="form__button">login</button>
          </div>
        </form>
      </div>
  )
}

export default Login
