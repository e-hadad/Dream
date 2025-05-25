import React, { isValidElement } from "react";
// import '../Components/Login.css'
import {useForm} from 'react-hook-form'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser,getListUser,setAdmin,setIdAdmin } from "./LoginSlice";
import { useRef } from "react";
import {useSelector} from "react-redux"
import {useEffect} from "react"
import './LoginShow.css'
const SignUp = () => {

    const {register,handleSubmit,getValues,formState:{errors,dirtyFields,isDirty,isValid}}=useForm({
        mode:"onChange",
        defaultValues:{email:"@gmail.com"}
    })
    let dis=useDispatch();
    const navigate=useNavigate();
      let users = useSelector((state) => state.UsersOrder?.listUsers || []);
    let idAdmin=useSelector((s)=>s.user?.idAdmin||'')
     useEffect(()=>{
        dis(getListUser());
        // console.log(getListUser());
    },[])
    
    const save=(data)=>{
        // debugger
        const userWithId={
            id : users.length,
            address:data.address,
            telephone:data.telephone,
            password:data.password,
            email:data.email,
            name:data.name,
            cart:[]
        }
        debugger
            dis(addUser(userWithId)).then(()=>{
                navigate(`/Login/`)
            })
            // .then(()=>{
                // dis(setIdAdmin(15))
                // localStorage.setItem("idAdmin", JSON.stringify("user"));
            // })
    }

    return (
        <form onSubmit={handleSubmit(save)} className="signup-form">
            <div>
                <label htmlFor="name">name: </label>
                <input
                    type="text"
                    id="name"
                    {...register("name", { minLength: 2 })}
                >
                </input>
            </div>
            {errors.name && <p>הכנס שם פרטי למעלה מ - 2 אותיות</p>}
            
            <div>
                <label htmlFor="email">email: </label>
                <input
                    type="text"
                    id="email"
                    {...register("email")}
                >
                </input>
            </div>
            {/* <div>
                <label htmlFor="emailConfirmation">email confirmation : </label>
                <input
                    type="text"
                    id="emailConfirmation"
                    {...register("emailConfirmation", { validate: (val) => { return val == getValues("email") } })}
                >
                </input>
            </div>
            {errors.emailConfirmation && <p>המייל לא תואם למקור!</p>} */}
            <div>
                 <label htmlFor="password">Password: </label>
                 <input
                      type="password"
                      id="password"
                      {...register("password", { required: true })}
                      />
            </div>
            <div>
                <label htmlFor="telephone">telephone: </label>
                <input
                    type="text"
                    id="telephone"
                    {...register("telephone", { required: true, message: "שדה זה חובה" })}
                >
                </input>
            </div>
            {errors.telephone && <p>{errors.telephone.message}</p>}
            <div>
                <label htmlFor="address">address: </label>
                <input
                    type="text"
                    id="address"
                    {...register("address")}
                >
                </input>
            </div>
            {/* <div>
                <label htmlFor="identity">id: </label>
                <input
                    type="text"
                    id="identity"
                    {...register("identity",{pattern: /^[0-9]{9}$/})}
                >
                </input>
            </div> */}
            {errors.identity && <p>"הכנס תעודת זהות בעלת 9 ספרות</p>}
            <button type="Submit" disabled={!isValid}>okey</button>
        </form >
    )
}
export default SignUp;