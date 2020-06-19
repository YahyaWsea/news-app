import React from 'react'
import NavBar from '../components/NavBar'


const WithNavBar = (Comp) => (props) => {
    return (
        <>
            <NavBar />
            <Comp {...props} />
        </>
    )
}


export default WithNavBar