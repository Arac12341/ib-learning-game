import React, { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import Link from 'next/link';


export default function SignUp() {
  const [userType, setUserType] = useState('Student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form validation and submission logic here
    console.log('Form submitted', formData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create an account</h1>

        {/* User Type Selection */}
        <div className={styles.userTypeContainer}>
          <label className={styles.userTypeLabel}>User Type:</label>
          <div className={styles.userTypeOptions}>
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'Student' ? styles.active : ''}`}
              onClick={() => setUserType('Student')}
            >
            Student
            </button>
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'Educator' ? styles.active : ''}`}
              onClick={() => setUserType('Educator')}
            >
            Educator
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {/* First Name and Last Name in a Single Row */}
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

          {/* Email Address */}
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

          {/* Confirm Email Address */}
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
        </form>

        <div className={styles.signInLink}>
          Already have an account?
          <Link href="/LogIn" className={styles.signInLink}>
             Sign Up
          </Link>  
        </div>
      </div>
    </div>
  );
}
