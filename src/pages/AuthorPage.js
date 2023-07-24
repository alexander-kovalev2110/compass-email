import React, { useState } from 'react'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import LoginDialog from '../components/LoginDialog'
import SignUpDialog from '../components/SignUpDialog'

const AuthorPage = (props) => {
    const { setUser, openAlert } = props

    // state to control <SignUpDialog> modal window
    const [signUpOpen, setSignUpOpen] = useState(false)     // to open/close <SignUpDialog> window

    const closeSignUp = () => {
        setSignUpOpen(false)
    }

    // state to control <LoginDialog> modal window
    const [loginOpen, setLoginOpen] = useState(false)       // to open/close <LoginDialog> window

    const closeLogin = () => {
        setLoginOpen(false)
    }

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Authorization
                    </Typography>
                    <Button color="inherit" onClick={() => setLoginOpen(true)}>
                        Login
                    </Button>
                    <Button color="inherit" onClick={() => setSignUpOpen(true)}>
                        SignUp
                    </Button>
                </Toolbar>
            </AppBar>

            <LoginDialog open={loginOpen} closeDialog={closeLogin} setUser={setUser} openAlert={openAlert} />

            <SignUpDialog open={signUpOpen} closeDialog={closeSignUp} setUser={setUser} openAlert={openAlert} />
        </div>
    )
}

export default AuthorPage
