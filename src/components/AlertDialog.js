import React from 'react'
import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"

// Displaying operating messages - success or error (severity)
const AlertDialog = (props) => {
    const { open, text, severity, closeAlert} = props

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
            <Alert onClose={closeAlert} severity={severity} sx={{ width: '100%', border: '1px solid' }} >
                {text}
            </Alert>
        </Snackbar>
    )
}

export default AlertDialog
