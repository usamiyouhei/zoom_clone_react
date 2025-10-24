import { Link, Navigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  const signin = async () => {
    if(!email || !password) return;
    const { user, token } = await authRepository.signin(email, password);
    localStorage.setItem('token', token)
    setCurrentUser(user)
  }

  if(currentUser) return <Navigate to="/" />

  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='logo'>
          <h1>Zoom Clone</h1>
        </div>

        <div className='login-form'>
          <div className='input-group'>
            <input
              type='email'
              placeholder='メールアドレス'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className='input-group'>
            <input
              type='password'
              placeholder='パスワード'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button
            type='button'
            className='signin-button'
            disabled={!email || !password}
            onClick={signin}>
            サインイン
          </button>
        </div>

        <div className='login-links'>
          <Link to='' className='signup-link'>
            アカウント作成
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
