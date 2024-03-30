import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { login } from '../api/authorization';
import { useAuth } from '../components/Context';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const context = useAuth();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(3, "Username too short"),
            password: Yup.string().required("Required").min(6, "Password too short").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+/, "at least 1 capital letter and 1 number")
        }),
        onSubmit: (values) => {
            // console.log(values)
            login(values)
            .then(msg => {
                // console.log(msg.status)
                localStorage.setItem("token", msg.data.token)
                toast.success('Successfully logged in', {
                    position: 'bottom-center',
                    style: {
                        background: '#d0f3d3'
                    }
                })
                setTimeout(() => {
                    context.login()
                    navigate('/')
                }, 700)
            })
            .catch((err) => toast.error(err.response.data, {
                position: 'bottom-center',
                style: {
                    background: '#fcaeae'
                }
            }))
        }
    })
    return (
        <div className="mt-[10rem]">
            <Toaster />
            <form onSubmit={formik.handleSubmit}>
                <div className="authorization">
                    <div className="text-[1.2rem]">Log in</div>
                    <div>
                        <input 
                            type="text"
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            placeholder="username"
                        />
                        <div className="typing-error">{formik.errors.username}</div>
                    </div>
                    <div>
                        <input 
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="password"
                        />
                        <div className="typing-error">{formik.errors.password}</div>
                    </div>
                    <button type="submit" className="btn">submit</button>
                </div>
            </form>
        </div>
    )
}
