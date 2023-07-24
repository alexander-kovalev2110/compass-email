import React from 'react'
import { Paper } from "@mui/material"
import { Table } from "@mui/material"
import { TableBody } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableContainer } from "@mui/material"
import { TableHead } from "@mui/material"
import { TableRow } from "@mui/material"
import { Toolbar } from "@mui/material"
import { Button } from '@mui/material'
import { Stack } from '@mui/material'

const EmailsTable = (props) => {
    const { mail, loadMail } = props
    const { results, next, previous } = mail

    return (
        <div>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Id</b></TableCell>
                            <TableCell><b>Recipient</b></TableCell>
                            <TableCell><b>Subject</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.recipient}</TableCell>
                                <TableCell>{item.subject}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} ml={2} mt={1}>
                <Button disabled={previous==null} onClick={() => loadMail(previous)}>Previous</Button>
                <Button disabled={next==null} onClick={() => loadMail(next)}>Next</Button>
            </Stack>
        </div>
    )
}

export default EmailsTable