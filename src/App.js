import React, { useState, useEffect } from 'react'
import { Routes,  Route } from 'react-router-dom'
import AuthorPage from './pages/AuthorPage'
import EmailPage from './pages/EmailPage'
import AlertDialog from "./components/AlertDialog";
import axios from "axios"

const url = 'http://68.183.74.14:4005/api/emails/'

const userInitialState = {
    id: 0,
    username: "",
    email: "",
    password: "",
    credentials: ""
}

const mailInitialState = {
    count: 0,
    next: "",
    previous: "",
    results: []         // Array of emails
}

const App = () => {
    // states to control <AlertDialog> modal window
    const [alertOpen, setAlertOpen] =  useState(false)              // to open/close <AlertDialog> window
    const [textMessage, setTextMessage] = useState("")              // message text for <AlertDialog>
    const [severityMessage, setSeverityMessage] = useState("info")  // kind of message for <AlertDialog>

    const openAlert = (message, severity) => {
        setAlertOpen(true)
        setTextMessage(message)
        setSeverityMessage(severity)
    }
    const closeAlert = () => {
        setAlertOpen(false)
    }
    //-----------------------------------------------

    const [user, setUser] = useState(userInitialState)      // local storage for current user

    const [mail, setMail] = useState(mailInitialState)      // email data (object) from swagger

    // Loading email data from swagger
    const loadMail = (url) => {
        axios(url, { headers: { 'Authorization': `Basic ${user.credentials}` }})
            .then(response => {
                setMail(response.data)
            })
            .catch(error => {
                console.error('Request error:', error)
            })
    }

    // Loading data from swagger when changing user
    useEffect (() => {
        if (user.id !== 0) {
            loadMail(url)
        }
    }, [user])

    const clearUser = () => {
        setUser(userInitialState)
        setMail(mailInitialState)
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthorPage setUser={setUser} openAlert={openAlert} />} />
                <Route path="/email" element={<EmailPage user={user} clearUser={clearUser}
                                                         mail={mail} loadMail={loadMail}
                                                         openAlert={openAlert}/>}
                />
            </Routes>

            <AlertDialog open={alertOpen} text={textMessage} severity={severityMessage} closeAlert={closeAlert} />
        </div>
    )
}

export default App
