import React from 'react'
import './Users.css'
import SingleUser from './SingleUser'

const Users = ({usersData, setUsersData}) => {
  return (
    <div id='usersContainer'>
      {usersData.map(data=><SingleUser key={data._id} usersData={usersData} setUsersData={setUsersData}  data={data} />)}
    </div>
  )
}

export default Users
