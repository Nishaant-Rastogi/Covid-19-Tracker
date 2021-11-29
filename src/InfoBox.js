import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import './InfoBox.css'

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary" gutterBottom>{title}</Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
