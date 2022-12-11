import React, {useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'; 
import {Input} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'
import { backend_api } from '../Utils/util';

import '../styles/index.scss';

export default function Login(){

    const [data, setData] = useState({username: '', password:''});

    const navigate = useNavigate();

    const changeData = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const sendForm = (event: any) => {
        event.preventDefault();
        if(data.username === '' && data.password === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese un usuario y contraseña',
            });
            return;
        }
        console.log(`Sending data to server...(${data.username},${data.password})`);
        /*
        backend_api.post("auth/login", {
            username: data.username,
            password: data.password
        }).then((res) => {
            console.log(res);
            if(res.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    text: 'Ingreso exitoso',
                }).then((res) => {
                    navigate('/home/modules');
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                });
            }        
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops :(',
                text: 'Error al intentar ingresar, por favor pruebe más tarde',
            })
        })
        */
        navigate('/home/modules');
    }

    const alertForget = () => {
        Swal.fire({
            title: '¿Olvidaste tu contraseña?',
            text: 'Por favor ponte en contacto con el administrador',
            icon: 'question',
            confirmButtonText: 'OK'
        })
    }

    return(
        <div>
            <div className="login-form-container">
                <form onSubmit={sendForm} id="loginForm">
                    <img alt="YOUR LOGO HERE"></img>
                    <div className='inputs-form-login'>
                        <Input onChange={changeData} className="formButton" variant="flushed" name="username" placeholder="Username" type="text"></Input>
                        <Input onChange={changeData} className="formButton" variant="flushed" name="password" placeholder="Password" type="password"></Input>
                        <button className="formButton" type="submit">Iniciar Sesión</button>
                        <h4 onClick={alertForget}>¿Olvidaste tu contraseña?</h4>
                    </div>
                </form>
            </div>
        </div>
    )
}