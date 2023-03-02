import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Patient from './Patient';
import AddPatient from './AddPatient';
const apiURL = "https://todo-api-d05y.onrender.com/patient";

function Home() {
    const [patients, setPatients] = useState([]);
    const [isLoading, setisLoading] = useState(false)
    async function fetchData() {
        setisLoading(true)
        await axios.get(apiURL).then(res => {
            setPatients(res.data.patients)
        }).catch(console.log)
        setisLoading(false);
    }
    useEffect(() => {

        fetchData()
    }, [])
    return (
        <>
            <div className='flex mt-20 flex-col gap-8 p-8 justify-center items-center'>
                <AddPatient reload={ fetchData } />
                <table className='table-auto'>
                    <thead>
                        <tr className='m-2 p-2 bg-gray-600'>
                            <th className='w-20 lg:w-56 text-lg lg:text-2xl p-2 m-2 border-2'>Patient Name</th>
                            <th className='w-20 lg:w-56 text-lg lg:text-2xl p-2 m-2 border-2'>Contact</th>
                            <th className='w-20 lg:w-56 text-lg lg:text-2xl p-2 m-2 border-2'>Address</th>
                            <th className='w-20 lg:w-56 text-lg lg:text-2xl p-2 m-2 border-2'>PinCode</th>
                            <th className='w-20 lg:w-56 text-lg lg:text-2xl p-2 m-2 border-2'>Action</th>

                        </tr>
                    </thead>
                    <tbody className=''>
                        { patients.map((event, i) => (
                            <Patient reload={ fetchData } event={ event } key={ event._id } />
                        )) }

                    </tbody>
                </table>
                { isLoading && <div className='w-full flex items-center justify-center p-5'>
                    <img className='h-12 w-12' src={ require('../images/loading.gif') } alt="" />
                </div> }
            </div>
        </>
    )
}

export default Home