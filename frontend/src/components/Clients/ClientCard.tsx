import React from 'react'
import { ICommonClientProps } from '../../interfaces/ClientsInterfaces'
import { 
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    IconButton } from '@material-ui/core'
import { MailOutline, Room } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { ClientCardMenu } from './ClientCardMenu'

const useStyles = makeStyles((theme: any) => ({
    card: {
        width: '100%',
        transition: 'all .5s',
        '& p': {
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'center'
        },
        '&:hover': {
            boxShadow: '0 0 2px 5px rgba(1, 135, 84, .5)',
        }
    },
    cardButtons: {
        justifyContent: "flex-end"
    },
    cardWrapper: {
        padding: theme.spacing(2)
    },
    clientName: {
        fontWeight: 700,
        marginBottom: theme.spacing(2),
        '& span': {
            fontSize: '1.5rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem'
            }
        }
    },
    clientPhone: {
        marginBottom: theme.spacing(2),
        '& span': {
            fontWeight: 300
        }
    },
    clientAddress: {
        '& span': {
            fontSize: '.9rem'
        }
    }
}));

const ClientCard = (props: ICommonClientProps) => {
    const classes = useStyles();
    const client = props.client;

    return (
    <div className={classes.cardWrapper}>
        { props.client && props.client !== undefined
        ? <Card className={classes.card}>
            <CardContent>

                <Typography className={classes.clientName}>
                    <span> { client.name } </span>
                </Typography>

                <Typography className={classes.clientPhone}>
                    <span> +{ client.phone } </span>
                </Typography>

                <Typography className={classes.clientAddress}>
                    <span> { client.city } </span>, 
                    <span> { client.street } </span> <br/>
                    <span> { client.building } </span>
                </Typography>

            </CardContent>
            
            <CardActions className={classes.cardButtons}>

                <IconButton>
                    <MailOutline />
                </IconButton>

                <IconButton>
                    <Room />
                </IconButton>

                <ClientCardMenu 
                    client={client} 
                    deleteClient={props.deleteClient} 
                    setEditableClient={props.setEditableClient}/>

            </CardActions>

          </Card>
        : null
        }
    </div>

    )
}

export default ClientCard