import React, { useContext } from 'react'
import "./SingleUser.css"
import ContextAPI from '../context/context'

const SingleUser = ({ data,usersData, setUsersData }) => {
    // context
    const {setName, setEmail, setNum, setIsEditBox, setDisableBtn, setUserId} = useContext(ContextAPI) 

    // delete function
    const deleteUser = (id)=>{
        
        let afterDeleteData = usersData.filter(data=>data._id !== id)
        setUsersData(afterDeleteData)
        
    }

    // edit user function
    const editUserHandle = (data)=>{
        setName(data.name)
        setEmail(data.email)
        setNum(data.number)
        setUserId(data._id)
        setIsEditBox(true)
        setTimeout(() => {
            
            setDisableBtn(true)
        }, );
    }

    return (
        <div className='singleUser'>
            {/* user data */}
            <h2 className='userName'>{data.name}</h2>
            <h4 ><span className='label'>Email: </span>{data.email}</h4>
            <h4 ><span className='label'>Number: </span>{data.number}</h4>

            {/* buttons for edit and delete */}
            <div className='buttons'>
                <button onClick={()=>editUserHandle(data)} className='edit'><span className="material-symbols-outlined">
                    edit
                </span></button>
                <button onClick={()=>deleteUser(data._id)} className='delete'><span className="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
    )
}

export default SingleUser

