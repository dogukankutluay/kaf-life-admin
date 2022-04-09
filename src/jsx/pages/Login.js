import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';
import { useHistory } from 'react-router-dom';
import { checkLogin } from './helpers/login';
const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [successFull, setSuccessFull] = useState(false);
  const handleBlur = e => {
    const newLoginData = { ...loginData };
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  };
  const submitHandler = async e => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = loginData;
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .then(response => {
        setError();
        setSuccessFull(true);
        const { success, token } = response.data;
        if (success) {
          localStorage.setItem('auth-token', token);
          setTimeout(() => {
            history.push('/');
            history.go(0);
          }, 2000);
        }
      })
      .catch(error => {
        setError(error.response.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="row justify-content-center h-100 align-items-center h-80">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form">
                <h4 className="text-center mb-4 "> Sign in your account </h4>
                <form action="" onSubmit={submitHandler}>
                  <div className="form-group">
                    {' '}
                    <label className="mb-1 ">
                      {' '}
                      <strong>Email</strong>{' '}
                    </label>
                    <input
                      placeholder="Email"
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={handleBlur}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1 ">
                      {' '}
                      <strong>Password</strong>{' '}
                    </label>
                    <input
                      placeholder="Password"
                      name="password"
                      type="password"
                      className="form-control"
                      onChange={handleBlur}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={() => submitHandler}>
                      {' '}
                      {loading ? 'Loading...' : 'Sign Me In'}
                    </button>
                    {error && <p className="text-danger mt-1">{error}</p>}
                    {successFull && (
                      <p className="text-success mt-1">Login success</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
