import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { app } from '../config/firebase';
import { useContext } from "react";
import NavContext from "../NavContext";

const db = getFirestore(app);


const generateId =()=>{
    var currentDate = new Date();
var year = currentDate.getFullYear();
var month = String(currentDate.getMonth() + 1).padStart(2, '0');
var day = String(currentDate.getDate()).padStart(2, '0');
var hours = String(currentDate.getHours()).padStart(2, '0');
var minutes = String(currentDate.getMinutes()).padStart(2, '0');
var seconds = String(currentDate.getSeconds()).padStart(2, '0');

var id = year + month + day + hours + minutes + seconds;
return id
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

export const addATask =async(task, email)=>{

    try{
        class Task {
            constructor( task, email) { 
                this.id = generateId();
                this.task = task.trim();
                this.completed = false;
                this.email = email;
                this.created = getCurrentDateTime();
            }
        }
        
        const taskData = new Task(task, email);

        console.log('taskData', taskData)
        
        await setDoc(doc(db, "tasks", taskData.id), {
          id: taskData.id,
          task: taskData.task,
          email: taskData.email,
          created: taskData.created,
        });

        return {status: true, task: taskData.task}

    }catch(error){ 
        throw new Error(error.message);
    }
    
}

export const getAllTask =async(email)=>{
    console.log('get all task inited', email);
    let documents = []
    try{
        const docRef = collection(db, "tasks");
        const docSnap = await getDocs(query(docRef, where('email', '==', email)))
          docSnap.forEach((doc) => {
            documents.push(doc);
          });
      console.log('documents', documents)
        console.log('docSnap', docSnap)
        if (docSnap.exists()) {
            console.log('expected data', docSnap.data())
            return {name:docSnap.data()}
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return null
        }
    }catch(err){
        console.log('get task errr', err)
        return null
        
    }
}