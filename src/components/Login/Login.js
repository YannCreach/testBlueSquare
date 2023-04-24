/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function Login({ setUser }) {
  const { REACT_APP_API_URL } = process.env;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    }
    catch (err) {
      setError('L\'adresse e-mail ou le mot de passe est incorrect');
    }
  };

  const handleAdminLogin = (e) => {
    setEmail('bbayer@example.com');
    setPassword('password');
    handleSubmit(e);
  };

  const handleClientLogin = (e) => {
    setEmail('borer.cecil@example.net');
    setPassword('password');
    handleSubmit(e);
  };

  return (

    <div className="flex w-full h-[100vh] overflow-hidden bg-[#f3f4f6] justify-center items-center">
      <div className="bg-[white] w-38 flex flex-col gap-4 rounded-lg drop-shadow-md p-4">
        <img src="/logo_hello.svg" alt="logo_hello" className="h-20 my-10" />
        <form onSubmit={handleSubmit}>

          <label htmlFor="email" className="">
            <p className="mb-2">Email</p>
            <input
              autoComplete="false"
              type="email"
              id="email"
              name="email"
              value={email}
              className="p-2 bg-[white] border border-[#9EA5B1] rounded-lg mb-4"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label htmlFor="password" className="">
            <p className="mb-2">Mot de passe</p>
            <input
              autoComplete="false"
              type="password"
              id="password"
              name="password"
              value={password}
              className="p-2 bg-[white] border border-[#9EA5B1] rounded-lg mb-4"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="w-full flex justify-center">
            <button type="submit" className="flex justify-center items-center p-4 h-10 bg-[#4e3ee0] rounded-lg text-[white] cursor-pointer mt-4"><FontAwesomeIcon icon={faCheck} className="h-5 text-[white] mr-4" />Se connecter</button>
          </div>
          <div className="flex w-full justify-between gap-4">
            <div onClick={(e) => handleAdminLogin(e)} className="w-1/2 flex justify-center items-center p-4 h-10 bg-[#e1e1e2] rounded-lg text-[black] cursor-pointer mt-4"><FontAwesomeIcon icon={faUserPlus} className="h-5 text-[black] mr-4" />Admin fake</div>
            <div onClick={(e) => handleClientLogin(e)} className="w-1/2 flex justify-center items-center p-4 h-10 bg-[#e1e1e2] rounded-lg text-[black] cursor-pointer mt-4"><FontAwesomeIcon icon={faUserMinus} className="h-5 text-[black] mr-4" />Client fake</div>
          </div>

        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
