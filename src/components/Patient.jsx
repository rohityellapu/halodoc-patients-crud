import React, { useState } from 'react'
import EditPatient from './EditPatient'
import axios from 'axios';

const apiURL = "http://localhost:10000/patient";
function Patient({ event, reload }) {
    const [isLoading, setisLoading] = useState(false)
    async function handleDelete() {
        setisLoading(true)
        await axios.delete(apiURL + '/' + event._id).then(console.log).catch(console.log)
        setisLoading(false)
        reload()
    }
    return (
        <>
            <tr key={ event._id } className='m-2 p-2 text-start px-10 text-semibold'>
                <th className='p-2 border-2'>{ event.name }</th>
                <th className='p-2 border-2'>{ event.contact }</th>
                <th className='p-2 border-2'>{ event.address }</th>
                <th className='p-2 border-2'>{ event.pincode } </th>
                <th className='p-2 border-2'>{ <div className='flex justify-around'>
                    <EditPatient reload={ reload } event={ event } />
                    <button disabled={ isLoading } className=' bg-red-500 rounded-md p-2' onClick={ handleDelete }>Delete</button>
                </div> } </th>
            </tr>
        </>
    )
}

export default Patient