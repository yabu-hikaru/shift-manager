import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../db/firebase"


//特定のシフト
export const getSubmittedShifts = async (date) => {
  const q = query(collection(db, "assignedShifts"), where("date", "==", date.format('YYYY-MM-DD')));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  }

//提出されたすべてのシフト取得
export const getAllSubmittedShifts = async () => {
  const q = query(collection(db, 'assignedShifts'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
}

