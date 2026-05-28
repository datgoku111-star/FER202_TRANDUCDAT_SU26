import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function RegistrationForm({ onRegister, onCancel }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Username is required.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required.';

    const pwd = form.password || '';
    const pwdErrors = [];
    if (pwd.length < 6) pwdErrors.push('at least 6 characters');
    if (!/[A-Z]/.test(pwd)) pwdErrors.push('an uppercase letter');
    if (!/[a-z]/.test(pwd)) pwdErrors.push('a lowercase letter');
    if (!/\d/.test(pwd)) pwdErrors.push('a number');
    if (!/[^A-Za-z0-9]/.test(pwd)) pwdErrors.push('a special character');
    if (pwdErrors.length) errs.password = `Password must include ${pwdErrors.join(', ')}.`;

    if (!form.confirm) errs.confirm = 'Please confirm your password.';
    else if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { username: form.username.trim(), email: form.email.trim(), password: form.password };
    if (onRegister) onRegister(payload);
    else console.log('Register:', payload);
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          value={form.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={form.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          isInvalid={!!errors.confirm}
        />
        <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
      </Form.Group>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" type="submit">Register</Button>
        <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
      </div>
    </Form>
  );
}

export default RegistrationForm;
    