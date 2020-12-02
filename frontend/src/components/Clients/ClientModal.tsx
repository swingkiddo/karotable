import React, { useState, useEffect } from 'react'
import { ICommonClientProps, IClientModalProps } from '../../interfaces/ClientsInterfaces'
import Modal from 'react-modal'
import { FormControl,
         InputLabel,
         TextField,
         Button } from '@material-ui/core' 
import { makeStyles } from "@material-ui/core/styles" 

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '25vw',
        height: '50%'
    }
}

const useStyles = makeStyles((theme: any) => ({
    form: {
        display: 'grid',
        gridTemplate: 'repeat(7, 1fr) / 1fr',
        height: '100%'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    addButton: {
        height: '50%'
    }
}))

export const ClientModal = (props: IClientModalProps) => {
    const client = props.client; 
    const user = props.user;

    const [pk, setPK] = useState(client && client !== undefined ? client.pk : 0)
    const [name, setName] = useState(client && client !== undefined ? client.name : '')
    const [phone, setPhone] = useState(client && client !== undefined ? client.phone : '')
    const [city, setCity] = useState(client && client !== undefined ? client.city : '')
    const [street, setStreet] = useState(client && client !== undefined ? client.street : '')
    const [building, setBuilding] = useState(client && client !== undefined ? client.building : '')
    const [email, setEmail] = useState(client && client !== undefined ? client.email : '')
    const classes = useStyles()
    const data = {
        "name": name,
        "phone": phone,
        "city": city,
        "street": street,
        "building": building,
        "email": email,
        "manager": user && user !== undefined ? props.user.pk : null
    }

    useEffect(() => {
        if (client && client !== undefined) {
            setPK(client.pk)
            setName(client.name)
            setPhone(client.phone)
            setCity(client.city)
            setStreet(client.street)
            setBuilding(client.building)
            setEmail(client.email)
        }
    }, [client])


    return (
        <Modal isOpen={props.showCreateModal} onRequestClose={props.closeCreateModal} style={customStyles}>
            <FormControl className={classes.form}>
                <TextField value={name} label="Наименование" variant="outlined" onChange={(e) => setName(e.currentTarget.value)}/>
                <TextField value={phone} label="Телефон" variant="outlined" onChange={(e) => setPhone(e.currentTarget.value)}/>
                <TextField value={city} label="Город" variant="outlined" onChange={(e) => setCity(e.currentTarget.value)}/>
                <TextField value={street} label="Улица" variant="outlined" onChange={(e) => setStreet(e.currentTarget.value)}/>
                <TextField value={building} label="Дом/Строение" variant="outlined" onChange={(e) => setBuilding(e.currentTarget.value)}/>
                <TextField value={email} label="Email" variant="outlined" onChange={(e) => setEmail(e.currentTarget.value)}/>
                <div className={classes.buttons}>
                    {props.client && client !== undefined
                    ? <Button 
                        variant="outlined" 
                        color="primary" 
                        className={classes.addButton} 
                        onClick={(e) => props.updateClient(e, pk, data)}>
                            Изменить
                        </Button>
                    : <Button variant="outlined" color="primary" className={classes.addButton} onClick={(e) => props.createClient(e, data)}>Добавить</Button>}

                   
                </div>
            </FormControl>
        </Modal>

            
    )
}