import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"

const url = 'http://68.183.74.14:4005/api/users/'

const SignUpDialog = (props) => {
    const { open, closeDialog, setUser, openAlert } = props

    let navigate = useNavigate()

    const SignUpHandler = (login, email, pw) => {
        const data = {
            username: login,
            email: email,
            password: pw
        }

        // Request using Axios
        axios.post(url, data)
            .then(response => {
                setUser(response.data)          // Response processing
                navigate('/email')
            })
            .catch(error => {
                openAlert("User with that username already exists", "error")
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
                    id={"email"}
                    label={"Email"}
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
                <Button onClick={() => SignUpHandler(document.getElementById("login").value,
                                                     document.getElementById("email").value,
                                                     document.getElementById("pw").value)}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignUpDialog
