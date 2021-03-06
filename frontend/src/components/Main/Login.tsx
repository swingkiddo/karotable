import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, TextField, Button } from '@material-ui/core'

import Authentication from '../../services/AuthenticationService'
const authentication = new Authentication()

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',

        "& > div": {
            width: '25%',
            height: '30%',
            margin: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                width: '50%',
                height: '40%',
                margin: theme.spacing(2)
            },
            [theme.breakpoints.down('sm')]: {
                width: '80%',
                height: '50%'
            }
        },
        

        "& form": {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
    },
    inputs: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    inputWrapper: {
        padding: theme.spacing(1),
        width: '80%',
        margin: '0 auto',
        "& > div": {
            width: "100%"
        }
    },
    button: {
        width: '25%'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(2)
    }
}));


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleLogin = (e: React.MouseEvent, data: {}) => {
        e.preventDefault();
        authentication.authtorizeUser(data);
    }

    const data = {
        "username": username,
        "password": password
    }

    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <form className="login-form">

                    <div className={classes.inputs}>
                        <div className={classes.inputWrapper}>
                            <TextField 
                            onChange={(e) => setUsername(e.currentTarget.value)} 
                            inputProps={{name: "username"}} 
                            value={username}
                            label="Login"
                            variant="outlined"
                            />
                        </div>

                        <div className={classes.inputWrapper}>
                            <TextField 
                            type="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            inputProps={{name: "password"}}
                            value={password}
                            label="Password" 
                            variant="outlined"
                            />
                        </div>

                        <div className={classes.buttonWrapper}>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick={(e) => handleLogin(e, data)}
                            >
                                Войти
                            </Button>
                        </div>
                    </div>

                </form>
            </Paper>
        </div>

    )
}


export default Login