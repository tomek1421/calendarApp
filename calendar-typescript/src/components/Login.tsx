import React from 'react'
import { useFormik } from 'formik';
import { login } from '../api/authorization';

export const Login: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values)
            login(values)
            .then(msg => {
                console.log(msg.data)
                localStorage.setItem("token", msg.data.token)
            })
            .catch(err => console.log(err.response.data))
        }
    })
    return (
        <div className="mt-[5rem]">
            <form onSubmit={formik.handleSubmit}>
                <div className="authorization">
                    <input 
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="username"
                    />
                    <input 
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="password"
                    />
                    <button type="submit" className="btn">submit</button>
                </div>
            </form>
        </div>
    )
}
