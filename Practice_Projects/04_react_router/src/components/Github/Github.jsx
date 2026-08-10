import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    const data =  useLoaderData()
    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     fetch('https://api.github.com/users/anshpatel0425')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         setData(data)
    //     })
    // }, []) 

    return (
        <div className='text-3xl bg-gray-600 text-center m-4 p-4 text-white'>Github Followers: {data.followers}
        <img src={data.avatar_url} alt="Github Picture" width={300} />
        </div>
    )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/anshpatel0425')
    return response.json()
}
