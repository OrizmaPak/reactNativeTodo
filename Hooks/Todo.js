import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { app } from '../config/firebase';
import { useContext } from "react";
import NavContext from "./NavContext";

const db = getFirestore(app);

const generateId = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var hours = String(currentDate.getHours()).padStart(2, '0');
  var minutes = String(currentDate.getMinutes()).padStart(2, '0');
  var seconds = String(currentDate.getSeconds()).padStart(2, '0');

  var id = year + month + day + hours + minutes + seconds;
  return id;
}

function getCurrentDateTime() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const addATask = async (task, email) => {
  try {
    class Task {
      constructor(task, email) {
        this.id = generateId();
        this.task = task.trim();
        this.email = email;
        this.checked = false;
        this.created = getCurrentDateTime();
      }
    }

    const taskData = new Task(task, email);

    console.log('taskData', taskData);

    await setDoc(doc(db, "tasks", taskData.id), {
      id: taskData.id,
      task: taskData.task,
      email: taskData.email,
      created: taskData.created,
      checked: taskData.checked
    });

    return { status: true, task: taskData.task };
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAllTask = async (email) => {
  console.log('get all task email init', email);
  if (email == undefined) return;
  try {
    const collectionRef = collection(db, 'tasks');
    const q = query(collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    console.log('documents', documents);
    return documents;
  } catch (err) {
    console.log('getalltask error', err);
    return null;
  }
}

export const updateFieldTask = async (id, field, value) => {
  console.log('update', id, field, value);
  try {
    const docRef = doc(db, "tasks", id);
    let result = await updateDoc(docRef, {
      [field]: value,
    });
    return true;
  } catch (error) {
    console.log('getalltask error', error);
    return null;
  }
}

export const updateMultipleFields = async (id, objFields) => {
  console.log('updatemultiple', id, objFields);
  try {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, objFields);
    return true;
  } catch (error) {
    console.log('edit error', error);
    return null;
  }
}

export const deleteTask = async (id) => {
  try {
    const documentRef = doc(db, "tasks", id);
    await deleteDoc(documentRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return null;
  }
}
