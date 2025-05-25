import {  useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser ,addUser,setAdmin,setIdAdmin} from './LoginSlice'
import { useNavigate } from "react-router-dom";

import './LoginShow.css';

export default function LoginShow() {
    const nameUser=useRef();
    const password=useRef();
    let dis=useDispatch();
    const navigate=useNavigate();


    let users=useSelector((state)=>state.user?.listUsers||[]);
    let status=useSelector((s)=>s.user?.status||'')
    let admin=useSelector((s)=>s.user?.admin||'')
    const idAdmin=useSelector((s)=>s.user?.idAdmin||'')
    localStorage.setItem("idAdmin",JSON.stringify(idAdmin))
   const idAdminLocalStorage = JSON.parse(localStorage.getItem("idAdmin"));

   
    useEffect(()=>{
        dis(getListUser());
        console.log(getListUser());
    },[])
    // useEffect(()=>{
        
    //     dis(getListUser());
    //     console.log(getListUser());
    //     console.log(users);
    // },[admin])

    // const checkUser=()=>{
    //     console.log("users",users)
    //     let user=nameUser.current.value;
    //     let pass=password.current.value;
    //     // console.log(user,pass);
    //     const findUser=users.find((p)=>p.password===pass && p.name===user);
    //     if(findUser){
    //         alert("ברוך הבא");
    //         dis(setIdAdmin(findUser.id));
    //     if(findUser.password==="m" && findUser.name==="m"){
    //         alert("ברוך הבא מנהל");
    //         dis(setAdmin("manager"));
    //         console.log("manager")  
    //     }
    //     else{
    //         dis(setAdmin("user"));
    //         console.log("user")
    //     }
    //         navigate(`/About`)

    //     }
    //     else {
    //         navigate(`/SignUp`)
    //         alert("משתמש לא קיים");
    //     }
    // }   
    
    const checkUser = () => {
    console.log("users", users);

    if (!users || users.length === 0) {
        alert("רשימת המשתמשים עדיין לא נטענה");
        return;
    }

    let userInput = nameUser.current.value.trim();     // Trim להסרת רווחים
    let passInput = password.current.value.trim();

    // חפש משתמש עם התאמה מדויקת (יכול להוסיף להוריד case sensitivity אם רוצים)
    const findUser = users.find(
        (p) => p.name === userInput && p.password === passInput
    );

    if (findUser) {
        alert("ברוך הבא");

        dis(setIdAdmin(findUser.id));

        if (findUser.password === "m" && findUser.name === "m") {
            alert("ברוך הבא מנהל");
            dis(setAdmin("manager"));
            console.log("manager");
        } else {
            dis(setAdmin("user"));
            console.log("user");
        }

        navigate(`/Home`);
    } else {
        alert("משתמש לא קיים");
        navigate(`/SignUp`);
    }
};

    return(
        <> 
        <div className="login-container">
        { (
            <div className="login-box">
            <input type="text" ref={nameUser} placeholder="שם משתמש" />
        <input type="password" ref={password} placeholder="סיסמא" />
        <button onClick={checkUser}>כניסה</button></div>)}
        </div>
        </>
    ) 
}