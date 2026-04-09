import { useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, validateAdminCredentials } from './adminAuth.js';
import './AdminDashboard.css';

const Login = ({ onLoginSuccess }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	const isLoggedIn = useMemo(() => isAdminAuthenticated(), []);

	if (isLoggedIn) {
		return <Navigate to='/admin' replace />;
	}

	const fromPath = location.state?.from?.pathname || '/admin';

	const submitHandler = (event) => {
		event.preventDefault();
		setError('');

		const isValid = validateAdminCredentials(identifier, password);
		if (!isValid) {
			setError('Incorrect username/email or password. Please try again.');
			return;
		}

		if (typeof onLoginSuccess === 'function') {
			onLoginSuccess();
		}

		navigate(fromPath, { replace: true });
	};

	return (
		<div className='admin-page'>
			<div className='admin-shell admin-login-shell'>
				<header className='admin-header admin-login-header'>
					<h1 className='admin-heading'>Admin Sign In</h1>
					<p className='admin-subtitle'>Log in to manage products and updates in your dashboard.</p>
				</header>

				<Form className='admin-login-form' onSubmit={submitHandler}>
					<Form.Group controlId='adminIdentifier' className='admin-form-field'>
						<Form.Label>Username or Email</Form.Label>
						<div className='admin-input-wrap'>
							<span className='admin-input-icon'>
								<FaUser />
							</span>
							<Form.Control
								type='text'
								placeholder='name or email'
								value={identifier}
								onChange={(event) => setIdentifier(event.target.value)}
								autoComplete='username'
								required
							/>
						</div>
					</Form.Group>

					<Form.Group controlId='adminPassword' className='admin-form-field'>
						<Form.Label>Password</Form.Label>
						<div className='admin-input-wrap admin-password-wrap'>
							<span className='admin-input-icon'>
								<FaLock />
							</span>
							<Form.Control
								type={showPassword ? 'text' : 'password'}
								placeholder='Enter password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								autoComplete='current-password'
								required
							/>
							<button
								type='button'
								className='admin-password-toggle'
								onClick={() => setShowPassword((prev) => !prev)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
								title={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</Form.Group>

					{error ? <p className='admin-login-error'>{error}</p> : null}

					<div className='admin-form-footer'>
						<Button type='submit' className='admin-btn admin-btn-primary admin-login-btn'>
							Log In
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Login;
