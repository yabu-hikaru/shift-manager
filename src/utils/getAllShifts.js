import { collection, getDocs } from "firebase/firestore"
import { db } from "../db/firebase"

export const getAllShifts = async () => {
  const shiftsRef = collection(db, "shifts");
  const querySnapshot = await getDocs(shiftsRef);
  const shiftDates = querySnapshot.docs.map(doc => doc.data().date);
  return shiftDates;
}