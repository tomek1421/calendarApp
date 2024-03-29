import React from 'react'
import { useFormik } from 'formik';
import { register } from '../api/authorization';
import { useAuth } from './Context';

export const Register: React.FC = () => {
    const context = useAuth();
    
    const [firstfaculty, setFirstfaculty] = React.useState<number>(0)
    const [secondfaculty, setSecondfaculty] = React.useState<number>(0)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            faculty1: "",
            faculty2: "",
            faculty3: ""
        },
        onSubmit: (values) => {
            // console.log(values)
            register({...values, faculty1: parseInt(values.faculty1), faculty2: parseInt(values.faculty2), faculty3: parseInt(values.faculty3)})
            .then(msg => {
                console.log(msg.status)
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
                    <div className="flex flex-col">
                        <label htmlFor="faculty1">Select your 1st faculty</label>
                        <select
                            name="faculty1"
                            onChange={(e) => {formik.handleChange(e); handleOption(e, 1)}}
                            value={formik.values.faculty1}
                        >
                            <option value="" >None</option>
                            { [1,2,3].filter(x => x != secondfaculty).map(y => <option value={y} >{y}</option>) }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="faculty2">Select your 2nd faculty</label>
                        <select
                            name="faculty2"
                            onChange={(e) => {formik.handleChange(e); handleOption(e, 2)}}
                            value={formik.values.faculty2}
                        >
                            <option value="" >None</option>
                            { [1,2,3].filter(x => x != firstfaculty).map(y => <option value={y} >{y}</option>) }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="faculty3">Select your 3rd faculty</label>
                        <select
                            name="faculty3"
                            onChange={formik.handleChange}
                            value={formik.values.faculty3}
                        >
                            <option value="" >None</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                        </select>
                    </div>
                    <button type="submit" className="btn" >submit</button>
                </div>
            </form>
        </div>
    )
}
