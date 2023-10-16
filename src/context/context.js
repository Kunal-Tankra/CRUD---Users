import { createContext, useState } from "react"


const ContextAPI = createContext()
const AppContext = ({ children }) => {
    // navbar form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [num, setNum] = useState("");
    const [userId, setUserId] = useState(-1);
    const [disableBtn, setDisableBtn] = useState(true);

    // all data
    const [usersData, setUsersData] = useState([]);

    // change navbar to edit box
    const [isEditBox, setIsEditBox] = useState(false);
    return (

        <ContextAPI.Provider value={{name, setName, email, setEmail, num, setNum, usersData, setUsersData, isEditBox, setIsEditBox, userId, setUserId, disableBtn, setDisableBtn}}>
            {children}
        </ContextAPI.Provider>
    )
}

export default ContextAPI;
export { AppContext }