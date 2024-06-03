import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../../db/firebase';
import { doc, getDoc } from 'firebase/firestore';

const LeaderLogin = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "leader" ) {
          // TODO navigate('leaderDashboard');
        } else {
          setError("権限がありません");
          auth.signOut();
        }
      } else {
        setError("該当するユーザーが存在しません")
      }
      //TODO navigate("/dashboard");
    } catch (error) {
      //TODO エラー処理
      console.error("エラーが起きました:", error);
    }

  }
  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
        required
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        required
      />
      <button type="submit">ログイン</button>
      { error && <p>{error}</p>}
    </form>
  )
}

export default LeaderLogin