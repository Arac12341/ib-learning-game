import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';  // Import jwtDecode
import UserContext from '../context/UserContext';  // Import UserContext
import styles from '../styles/LogIn.module.css';

export default function LoginForm() {
  const { setUser } = useContext(UserContext);  // Destructure setUser from UserContext
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Login successful! Redirecting...');
        setError('');

        // Set token in cookies
        setCookie(null, 'token', data.token, {
          maxAge: 36000,  // 10 hours
          path: '/',
        });

        // Decode token and update the UserContext
        const decodedToken = jwtDecode(data.token);
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
          username: decodedToken.username || 'User',
        });

        // Redirect user to home page after login
        setTimeout(() => {
          router.push('/');  // Redirect to home page
        }, 1000);  // 1 second delay before redirecting
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>Log in</h1>
        <p>Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <label className={styles.inputLabel} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputContainer}
            placeholder="Enter your email"
            required
          />

          <label className={styles.inputLabel} htmlFor="password">Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputContainer}
              placeholder="Enter your password"
              required
            />
            <span
              className={styles.passwordToggle}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>

        <div className={styles.links}>
          <Link href="/reset-password" className={styles.cardButton}>
            Reset Password
          </Link> <br /> Don't have an account? <br />
          <Link href="/SignUp" className={styles.cardButton}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
