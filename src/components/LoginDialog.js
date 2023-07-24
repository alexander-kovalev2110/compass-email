import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"
import axios from "axios"

const url = 'http://68.183.74.14:4005/api/users/current/'

const LoginDialog = (props) => {
    const { open, closeDialog, setUser, openAlert } = props

    let navigate = useNavigate()

    const loginHandler = (login, pw) => {
        // Form a string with credentials and encode it in base64
        const credentials = `${login}:${pw}`
        const base64Credentials = btoa(credentials)

        axios(url, { headers: { 'Authorization': `Basic ${base64Credentials}` }
            })
            .then(response => {
                setUser({...response.data, credentials: base64Credentials})   // Response processing
                navigate('/email')              // Go to page <EmailPage>
            })
            .catch(error => {
                openAlert("User is not found", "error")
                console.error('Request error:', error)
            })

        closeDialog()
    }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[600],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id={"login"}
                    label={"Login"}
                    type={"text"}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    margin="dense"
                    id={"pw"}
                    label={"Password"}
                    type={"text"}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => loginHandler(document.getElementById("login").value,
                    document.getElementById("pw").value)}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginDialog
