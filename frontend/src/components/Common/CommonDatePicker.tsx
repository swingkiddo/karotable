import React, { useState } from 'react'
import moment from 'moment'

import { IDatePickerProps } from '../../interfaces/CommonInterfaces'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { IconButton } from "@material-ui/core"
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

import DateFnsUtils from '@date-io/date-fns'
import MomentUtils from "@date-io/moment"
import "moment/locale/ru"
moment.locale("ru")

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
        },

        [theme.breakpoints.down('sm')]: {
            '& button': {
                marginRight: '0',
                marginLeft: '0'
            }
        }
    }
}))

const CommonDatePicker = (props: IDatePickerProps) => {
    const changeDateHandler = (date: any) => {
        props.setDate(moment(date.toDate()).format("YYYY-MM-DD"))
    }

    const addDays = (days: number) => {
        props.setDate(moment(props.date)
        .add(days, "day")
        .format("YYYY-MM-DD"))
    }

    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <IconButton>
                <ArrowLeft onClick={(e) => addDays(-1)} /> 
            </IconButton>

            <MuiPickersUtilsProvider
            utils={MomentUtils}
            libInstance={moment}
            locale="ru"
            >
                <DatePicker
                value={props.date}
                onChange={date => changeDateHandler(date)}
                format="D MMM yyyy"
                />
            </MuiPickersUtilsProvider>

            <IconButton >
                <ArrowRight onClick={(e) => addDays(1)} />
            </IconButton>
        </div>
    )
}

export default CommonDatePicker