import instance from './axios';

const url = 'http://localhost:8080/api'

interface subject {
    name: string,
    facultyType: number
}

async function createSubject(body: subject) {
    return await instance.post(`${url}/subjects`, body)
}

export { createSubject }