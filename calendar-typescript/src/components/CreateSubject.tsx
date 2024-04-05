import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { createSubject } from "../api/subject";
import toast, { Toaster } from "react-hot-toast";

export const CreateSubject: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            facultyType: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const facultyTypeInt = parseInt(formik.values.facultyType)
            createSubject({name: values.name, facultyType: facultyTypeInt})
            .then(msg => {
                console.log(msg.data)
                toast.success('Successfully created subject!', {
                    position: 'bottom-center',
                    style: {
                        background: '#d0f3d3'
                    }
                })
            })
            .catch(err => {
                console.log(err)
                toast.error('Something gone wrong!', {
                    position: 'bottom-center',
                    style: {
                        background: '#fcaeae'
                    }
                })
            })
        }
    })

    return (
        <div className="mt-[10rem]">
            <Toaster />
            <form onSubmit={formik.handleSubmit} >
                <div className="authorization">
                    <div className="text-[1.2rem]">Create new subject</div>
                    <div>
                        <input 
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="name of subject"
                        />
                        <div className="typing-error">{formik.errors.name}</div>
                    </div>
                    <div className="flex flex-col gap-[1rem]">
                        <fieldset>
                            <legend>Select type of faculty:</legend>
                            <input
                                type="radio"
                                name="facultyType"
                                value="0"
                                onChange={formik.handleChange}
                            />
                            <label className="ml-[0.5rem]" >normalny przedmiot</label>
                            <br />
                            
                            <input
                                type="radio"
                                name="facultyType"
                                value="1"
                                onChange={formik.handleChange}
                            />
                            <label className="ml-[0.5rem]">fakultet 30h</label>
                            <br />
                            <input
                                type="radio"
                                name="facultyType"
                                value="2"
                                onChange={formik.handleChange}
                            />
                            <label className="ml-[0.5rem]">fakultet 15h</label>
                        </fieldset>
                        <button type="submit" className="btn" >create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}