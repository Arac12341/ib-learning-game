import React, { useState } from 'react';
import styles from '../styles/LogIn.module.css';
import Link from 'next/link';

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>Log in</h1>
        <p>Welcome back! Please enter your details.</p>
        <form className={styles.formContainer}>
          <label className={styles.inputLabel} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.inputContainer}
            placeholder="Enter your email"
            required
          />

          <label className={styles.inputLabel} htmlFor="password">Password</label>
          <div className={styles.formContainer}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
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
        </form>

        <div className={styles.links}>
          <a href="#">Reset password</a> <br/> Don't have an account?
          <Link href="/SignUp" className={styles.cardButton}>
             Sign Up
          </Link>        
          </div>
      </div>
    </div>
  );
}
