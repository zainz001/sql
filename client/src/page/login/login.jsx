import React, { useState } from 'react';
import { signInFailure, signInSuccess, signInStart } from '../../redux/userslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css"
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
const navigate =useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // Update the state based on the input's name
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/Login", formData,{
        withCredentials:true,
      });
      const data = await response.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't have an account? <a href="/register">Register</a></span>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username" // Make sure to set the name attribute to match the state property
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password" // Make sure to set the name attribute to match the state property
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p>{error}</p>}
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
