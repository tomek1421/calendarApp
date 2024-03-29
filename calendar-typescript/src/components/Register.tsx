import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { register } from '../api/authorization';
import { useAuth } from './Context';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
    const context = useAuth();

    const navigate = useNavigate();
    
    const [firstfaculty, setFirstfaculty] = React.useState<string>("")
    const [secondfaculty, setSecondfaculty] = React.useState<string>("")
    const [faculties60, setfaculties60] = React.useState<string[]>(["Programowanie w Golang", "Programowanie deklaratywne", "Algorytmy numeryczne"])
    const [faculties30, setFaculties30] = React.useState<string[]>(["Postawy kryptografii", "Programowanie w C++"])

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            faculty1: "",
            faculty2: "",
            faculty3: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(3, "Username too short"),
            password: Yup.string().required("Required").min(6, "Password too short").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+/, "at least 1 capital letter and 1 number")
        }),
        onSubmit: (values) => {
            // console.log(values)
            register({...values, faculty1: parseInt(values.faculty1), faculty2: parseInt(values.faculty2), faculty3: parseInt(values.faculty3)})
            .then(msg => {
                // console.log(msg.status)
                localStorage.setItem("token", msg.data.token)
                context.login()
                
            })
            .catch(err => console.log(err.response.data))
        }
    })

    function handleOption(event: React.ChangeEvent<any>, option: number) {
        const {value} = event.target
        if (option === 1) setFirstfaculty(value)
        else if (option === 2) setSecondfaculty(value)
    }

    return (
        <div className="mt-[15rem]">
            <form onSubmit={formik.handleSubmit}>
                <div className="authorization">
                    <div className="text-[1.2rem]">Registration</div>
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
                    <div className="flex flex-col">
                        <label htmlFor="faculty1">Select your 1st 60h faculty</label>
                        <select
                            name="faculty1"
                            onChange={(e) => {formik.handleChange(e); handleOption(e, 1)}}
                            value={formik.values.faculty1}
                        >
                            <option value="" >None</option>
                            {formik.values.username != "Admin" && faculties60.filter(x => x != secondfaculty).map(y => <option value={y} >{y}</option>) }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="faculty2">Select your 2nd 60h faculty</label>
                        <select
                            name="faculty2"
                            onChange={(e) => {formik.handleChange(e); handleOption(e, 2)}}
                            value={formik.values.faculty2}
                        >
                            <option value="" >None</option>
                            {formik.values.username != "Admin" && faculties60.filter(x => x != firstfaculty).map(y => <option value={y} >{y}</option>) }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="faculty3">Select your 30h faculty</label>
                        <select
                            name="faculty3"
                            onChange={formik.handleChange}
                            value={formik.values.faculty3}
                        >
                            <option value="" >None</option>
                            {formik.values.username != "Admin" && faculties30.map(y => <option value={y} >{y}</option>) }
                        </select>
                    </div>
                    <button type="submit" className="btn" >submit</button>
                </div>
            </form>
        </div>
    )
}
