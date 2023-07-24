import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import SendEmailDialog from "../components/SendEmailDialog"
import EmailsTable from "../components/EmailsTable"

const EmailPage = (props) => {
    const { user, clearUser, mail, loadMail, openAlert } = props

    // state to open/close <SendEmailDialog> modal window
    const [sendOpen, setSendOpen] = useState(false)     // to open/close <SendEmailDialog> window

    const closeSend = () => {
        setSendOpen(false)
    }

    let navigate = useNavigate()

    const logoutHandler = () => {
        clearUser()
        navigate('/')           // Go to page <AuthorPage>
    }

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h8" sx={{ flexGrow: 1 }}>
                        {user.username} / {user.email} / ({mail.count})
                    </Typography>
                    <Button color="inherit" onClick={() => setSendOpen(true)}>
                        SendEmail
                    </Button>
                    <Button color="inherit" onClick={logoutHandler}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <EmailsTable mail={mail} loadMail={loadMail} />

            <SendEmailDialog open={sendOpen} closeDialog={closeSend} user={user}
                             loadMail={loadMail} openAlert={openAlert}/>

        </div>
    )
}

export default EmailPage
