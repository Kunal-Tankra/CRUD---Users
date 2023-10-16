import {useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ContextAPI from './context/context';
import Users from './components/Users';

function App() {
  // all users data
  const {usersData, setUsersData} = useContext(ContextAPI)

  const fetchDataFunc = () => {
    fetch("https://api.storerestapi.com/users").then(res => {
      return res.json();
    })
    .then(data => {
      setUsersData(data.data)
    })
  }

  useEffect(() => {
    fetchDataFunc()
  }, []);



  return (
    <div>
      <Navbar setUsersData={setUsersData} usersData={usersData} />
        <Users usersData={usersData} setUsersData={setUsersData} />
    </div>
  );
}

export default App;
