import React, { useState } from 'react';
import './register.css'; // Import your CSS file for styling
import axios from "axios";

const Register = () => {
  const [error, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    coverpic: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/auth/Signup", formData);

      if (!response.data.success) {
        setErr(response.data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setErr(null);

    } catch (error) {
      setLoading(false);
      setErr(error.response.data);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Cover Pic"
              name="coverpic"
              value={formData.coverpic}
              onChange={handleChange}
            />
            {error && <p>{error}</p>}
            <button onClick={handleClick} disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
