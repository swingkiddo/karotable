import React, { useState } from 'react'
import { IClientCardProps } from '../../interfaces/ClientsInterfaces'
import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: any) => ({
    card: {
        maxWidth: '300px',
        '& p': {
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center'
        }
    },
    cardWrapper: {
        padding: '10px',
    },
    clientName: {
        fontWeight: 700
    }
}));

const ClientCard = (props: IClientCardProps) => {
    const classes = useStyles();
    const client = props.client;

    return (
    <div className={classes.cardWrapper}>
        { props.client && props.client !== undefined
        ? <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.clientName}>
                    { client.name }
                </Typography>
                <Typography>
                    +{ client.phone }
                </Typography>
                <Typography>
                    { client.city } <br />
                    { client.street } <br />
                    { client.building }
                </Typography>
            </CardContent>
          </Card>
        : null
        }
    </div>

    )
}

export default ClientCard