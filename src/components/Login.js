import React from 'react';
import axios from 'axios';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Login.css';
import URL from '../services/httpService';
import Cookies from 'js-cookie';
import { initSocket } from '../socket';

const Login = ( props) => {
  const loginUser = (event) =>{
    event.preventDefault();
    const fd = new FormData(event.target);
    const data  = Object.fromEntries(fd.entries());
    axios.post(`${URL}/login`,data).then( (res) => {
      const user = {
        "_id": res.data.result.user_id._id,
        "firstName": res.data.result.user_id.firstName,
        "lastName": res.data.result.user_id.lastName,
        "phoneNumber": res.data.result.user_id.phoneNumber
      }
      localStorage.setItem('userData', JSON.stringify(user))
      Cookies.set('token', res.data.result._id);
      props.login( user);
      initSocket( res.data.result.user_id._id);
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
              <input name="firstName" type="text" className="form__input" placeholder="Username" />
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
