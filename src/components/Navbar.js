import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import ContextAPI from '../context/context';
import { Alert, Snackbar } from '@mui/material';

const Navbar = ({ setUsersData, usersData }) => {
    const { name, email, num, setName, setEmail, setNum, isEditBox, setIsEditBox, userId, disableBtn, setDisableBtn } = useContext(ContextAPI)
    const [id, setId] = useState(0);
    const [hideCancelBtn, setHideCancelBtn] = useState(true);
    const [open, setOpen] = useState(false);

    // alert state
    const [alert, setAlert] = useState({
        property: "",
        value: ""
    });


    // set create button
    useEffect(() => {
        if (name.length > 0 && (email.length > 0 && num.toString().length > 0)) {  //add button
            setDisableBtn(false)
        }
    }, [email, num, name]);


    // show alert function
    const showAlert = (prop, val) => {
        setAlert({ property: prop, value: val })
        setOpen(true)

        setTimeout(() => {
            setOpen(false)
        }, 5000);
    }

    // check unique
    const isUnique = (currId) => {
        for (const data of usersData) {
            if (data._id !== currId) {
                if (data.number.toString() === num) {
                    showAlert("Number", num)
                    return false;
                }
            }
        }

        return true
    }

    // add and update function
    const handelAddUser = () => {
        if (!isUnique(id)) {
            setHideCancelBtn(false)

            return;
        }

        const newUser = {
            "_id": id,
            name,
            email,
            "number": num
        }
        setUsersData([...usersData, newUser])
        setId(id + 1)

        handelCancel()
    }

    // update function
    const handelUpdateUser = () => {
        if (!isUnique(userId)) {

            return;
        }

        setUsersData(usersData.map(data => {
            if (data._id === userId) {
                return {
                    "_id": data._id,
                    name,
                    email,
                    "number": num
                }
            }

            return data
        }))


        handelCancel()
    }

    const handelCancel = () => {
        setName("")
        setEmail("")
        setNum("")
        setDisableBtn(true)
        setIsEditBox(false)
        setHideCancelBtn(true)

    }


    const handelEnterClick = (e)=>{
        if(e.key === "Enter"){
            isEditBox ? handelUpdateUser() : handelAddUser()
        }
    }

    return (
        <div className='formContainer'>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
                    This <strong>"{alert.property}"</strong> : <strong>"{alert.value}"</strong> already exists
                </Alert>
            </Snackbar>

            <div id='form'>
                <div>
                    <label htmlFor="name"><strong>Name:</strong>  </label>
                    <input  onKeyDown={(e)=>{handelEnterClick(e)}} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email"><strong>Email:</strong>  </label>
                    <input  onKeyDown={(e)=>{handelEnterClick(e)}} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="number"><strong>Number:</strong>  </label>
                    <input  onKeyDown={(e)=>{handelEnterClick(e)}} type="number" id="number" value={num} onChange={(e) => setNum(e.target.value)} />
                </div>

                <button style={{ cursor: disableBtn && "default" }} onClick={isEditBox ? handelUpdateUser : handelAddUser} disabled={disableBtn} ><strong>{isEditBox ? "Update User" : "Create New User +"}</strong></button>

            </div>
            <button onClick={handelCancel} className={`cancelBtn ${(!isEditBox && hideCancelBtn) ? "hideCancelBtn" : ""}`} ><strong>X</strong></button>
        </div>
    )
}

export default Navbar
