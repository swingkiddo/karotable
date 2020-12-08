import React, { useState } from 'react'
import moment from 'moment'

import { IDatePickerProps } from '../../interfaces/CommonInterfaces'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles' 
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { IconButton } from "@material-ui/core"
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

const useStyles = makeStyles((theme: any) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& input': {
            textAlign: 'center'
        },
        '& button': {
            margin: theme.spacing(3)
        }
    }
}))

const CommonDatePicker = (props: IDatePickerProps) => {
    const changeDateHandler = (date: any) => {
        props.setDate(moment(date).format("YYYY-MM-DD"))
    }

    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <IconButton>
                <ArrowLeft onClick={(e) => props.setDate(moment(props.date).add(-1, "day").format("YYYY-MM-DD"))}/>
            </IconButton>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={props.date} onChange={changeDateHandler} format="d MMM yyyy" />
            </MuiPickersUtilsProvider>
            <IconButton >
                <ArrowRight onClick={(e) => props.setDate(moment(props.date).add(1, "day").format("YYYY-MM-DD"))}/>
            </IconButton>
        </div>
    )
}

export default CommonDatePicker