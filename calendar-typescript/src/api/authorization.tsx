import axios from 'axios';
const url = 'http://localhost:8080/api'

interface register {
    username: string,
    password: string,
    faculty1: number,
    faculty2: number,
    faculty3: number
}

interface login {
    username: string,
    password: string
}

async function register(body: register) {
    return await axios.post(`${url}/account/register`, body)
}

async function login(body: login) {
    return await axios.post(`${url}/account/login`, body)
}

export { register, login }