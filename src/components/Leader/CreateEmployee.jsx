import React, { useState } from 'react'
import { auth, db } from '../../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const CreateEmployee = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

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
      alert("成功しました");
    } catch (error) {
      //TODO 失敗処理
      console.error("エラーが起きました:", error)
    }
  }


  return (
    <form onSubmit={handleCreateEmployee}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">登録</button>
    </form>
  )
}

export default CreateEmployee