import React from 'react'
import Register from "../components/Register";

const Auth = ({addContact, login}) => {
    return (
        <div id="authPage">
            <Register addContact={addContact}/>
        </div>
    )
}

export default Auth
