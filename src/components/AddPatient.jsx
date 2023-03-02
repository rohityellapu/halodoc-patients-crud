import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Popup from 'reactjs-popup';
const apiURL = "http://localhost:10000/patient";

function AddPatient({ reload }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setisLoading] = useState(false)
    const [success, setsuccess] = useState('')
    const onSubmit = async data => {

        try {
            setisLoading(true)
            const response = await axios.post(apiURL,
                { ...data }).then((items) => console.log(items))
                .catch(e => console.log(e));
            setisLoading(false)
            reset();
            setsuccess('Patient is succesfully listed.')
            setTimeout(() => {
                setsuccess('')
                reload()
            }, 4000);


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div><Popup
            className=''
            trigger={ <button className="button p-2 bg-blue-500 rounded-md">Add Patient </button> }
            modal
            nested
        >
            { close => (
                <div className="modal w-96 flex flex-col gap-8 p-4 items-center justify-center bg-black text-white rounded-xl">
                    <button className="close absolute top-1 right-1 text-2xl font-bold text-red-700 bg-red-100 rounded-full py-1 px-2" onClick={ close }>
                        &times;
                    </button>
                    <div className="header text-3xl p-4"> Add a Patient </div>
                    <form onSubmit={ handleSubmit(onSubmit) } className='flex flex-col gap-2 text-white rounded-xl bg-black p-4 w-full'>

                        <div className="name">

                            <input autoComplete='off' className='bg-black w-full p-2 rounded-md border-none focus:outline-green-400' type="text" placeholder='Patient Name' { ...register('name', { required: "Please enter Patient name." }) } id="" />
                            <p className='text-red-400 text-xs pl-1'>{ errors.name?.message }</p>
                        </div>

                        <div className="contact">

                            <input autoComplete='off' className='bg-black w-full p-2 rounded-md border-none focus:outline-green-400' type="number" placeholder='Contact Number'
                                { ...register('contact', { required: "Please enter Contact details", minLength: { value: 10, message: "Should contain minimum 10 digits" }, maxLength: { value: 12, message: "Should not contain more than 12 digits" } }) } id="" />
                            <p className='text-red-400 text-xs pl-1'>{ errors.contact?.message }</p>

                        </div>
                        <div className="address">

                            <input autoComplete='off' className='bg-black w-full p-2 rounded-md border-none focus:outline-green-400' type="text" placeholder='Full Address' { ...register('address', { required: "Please enter Patient address." }) } id="" />
                            <p className='text-red-400 text-xs pl-1'>{ errors.address?.message }</p>
                        </div>
                        <div className="pincode">

                            <input autoComplete='off' className='bg-black w-full p-2 rounded-md border-none focus:outline-green-400' type="number" placeholder='PIN '
                                { ...register('pincode', { required: "Please enter pincod", minLength: { value: 5, message: "Should contain minimum 5 digits" }, maxLength: { value: 6, message: "Should not contain more than 6 digits" } }) } id="" />
                            <p className='text-red-400 text-xs pl-1'>{ errors.pincode?.message }</p>

                        </div>
                        { isLoading && <div className='w-full flex items-center justify-center p-5'>
                            <img className='h-12 w-12' src={ require('../images/loading.gif') } alt="" />
                        </div> }
                        <p className='text-green-500'>{ success }</p>
                        <div className="actions flex justify-around">
                            <input disabled={ isLoading } type="submit" value="Post" className='p-2 rounded-md bg-blue-600 disabled:opacity-50 hover:cursor-pointer hover:saturate-200' />
                            <button
                                className="button bg-red-500 rounded-md p-2"
                                onClick={ () => {
                                    close();
                                } }
                            >
                                Close
                            </button>
                        </div>


                    </form>

                </div>
            ) }
        </Popup></div>
    )
}

export default AddPatient