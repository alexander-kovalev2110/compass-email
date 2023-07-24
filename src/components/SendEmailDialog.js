import React from 'react'
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"
import axios from "axios"

const url = 'http://68.183.74.14:4005/api/emails/'

const SendEmailDialog = (props) => {
    const { open, closeDialog, user, loadMail, openAlert } = props

    const sendHandler = (recipient, subject, message) => {
        const data = {
            sender: user.id,
            recipient: recipient,
            subject: subject,
            message: message
        }

        // console.log(user.id, recipient, subject, message, user.credentials)
        axios.post(url, data, { headers: { 'Authorization': `Basic ${user.credentials}` }})
            .then(response => {
                loadMail(url)
            })
            .catch(error => {
                openAlert("Bad Email", "error")
                console.error('Request error:', error);
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
                    id={"recipient"}
                    label={"Recipient (email)"}
                    type={"text"}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    margin="dense"
                    id={"subject"}
                    label={"Subject"}
                    type={"text"}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    multiline
                    margin="dense"
                    id={"message"}
                    label={"Message (multiline)"}
                    type={"text"}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => sendHandler(document.getElementById("recipient").value,
                                                document.getElementById("subject").value,
                                                document.getElementById("message").value
                    )}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SendEmailDialog
