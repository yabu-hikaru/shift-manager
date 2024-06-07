import React, { useState } from 'react'
import { auth, db } from '../../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import "../Common/Form.css"
  
  const LeaderSignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc( db, "users", user.uid ), {
          email: user.email,
          role: "leader"
        });

        navigate('/leader/dashboard');
      } catch ( error ) {
        console.error("エラーが起きました:", error);
      }
    }
    return (
    <div className='form-card'>
      <form onSubmit={handleSignUp} className='form-container'>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='form-input' 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className='form-input'
          placeholder='Password'
        />
        <button type="submit" className='form-button'>登録</button>
      </form>
    </div>
    )
  }
  
  export default LeaderSignUp