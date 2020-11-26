import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Paper, FormControl, InputLabel, Input, TextField, Button } from '@material-ui/core'
import { TheatersRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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
            margin: theme.spacing(2)
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


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const data = {
        "username": username,
        "password": password
    }

    return (
        <div className={classes.wrapper}>
            <Paper elevation={3}>
                <form className="login-form" onSubmit={e => props.handleLogin(e, data)}>
                    <div className={classes.inputs}>
                        <div className={classes.inputWrapper}>
                            <TextField 
                                onChange={handleChange} 
                                inputProps={{name: "username"}} 
                                value={username}
                                label="Login"
                                classes={classes.input}
                                variant="outlined"
                            />
                        </div>

                        <div className={classes.inputWrapper}>
                            <TextField 
                                type="password"
                                onChange={handleChange}
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
                                onClick={e => props.handleLogin(e, data)}
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