import React, { useState } from 'react'
import { auth, db } from '../../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
  
  const LeaderSignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    //TODO const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc( db, "users", user.uid ), {
          email: user.email,
          role: "leader"
        });

        //TODO navigate('/dashboard');
      } catch ( error ) {
        console.error("エラーが起きました:", error);
      }
    }
    return (
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">登録</button>
      </form>
      
    )
  }
  
  export default LeaderSignUp