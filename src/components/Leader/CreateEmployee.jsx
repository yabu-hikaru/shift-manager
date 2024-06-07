import React, { useEffect, useState } from 'react'
import { auth, db } from '../../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../Common/Form.css";

const CreateEmployee = ({ isLdrAuth }) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLdrAuth) {
      navigate('/leader/login');
    }
  }, [])

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword( auth, email, password );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid ), {
        email: user.email,
        role: "employee"
      });

      //TODO 成功処理
      alert("ユーザーが作成されました。");
      navigate("/leader/dashboard");
    } catch (error) {
      //TODO 失敗処理
      console.error("エラーが起きました:", error)
    }
  }


  return (
    <div className='form-card'>
      <form onSubmit={handleCreateEmployee} className='form-container' >
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className='form-input' 
          placeholder='Email'
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

export default CreateEmployee