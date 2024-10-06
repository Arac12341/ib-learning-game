import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Sign-up successful! Redirecting...');
        setError('');
        setTimeout(() => {
          router.push('/LogIn');  // Redirect to login page
        }, 2000);
      } else {
        setError(data.message || 'An error occurred during sign-up');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create an account</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {/* First Name and Last Name */}
          <div className={styles.nameRow}>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel} htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={styles.inputContainer}
                placeholder="First name"
                required
              />
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel} htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={styles.inputContainer}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.emailRow}>
            <label className={styles.inputLabel} htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.largeInput}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Confirm Email */}
          <div className={styles.emailRow}>
            <label className={styles.inputLabel} htmlFor="confirmEmail">Confirm Email Address</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              className={styles.largeInput}
              placeholder="Confirm your email"
              required
            />
          </div>

          {/* Password */}
          <div className={styles.passwordRow}>
            <label className={styles.inputLabel} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.largeInput}
              placeholder="Enter a password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className={styles.passwordRow}>
            <label className={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.largeInput}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className={styles.termsContainer}>
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label htmlFor="termsAccepted">
              I agree to the <a href="#">Terms and Conditions</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>Create</button>

          {/* Error and Success Messages */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>

        <div className={styles.signInLink}>
          Already have an account? <Link href="/LogIn">Log In</Link>
        </div>
      </div>
    </div>
  );
}
