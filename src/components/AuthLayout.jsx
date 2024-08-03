import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected
({ children, authentication = true }) {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    // The useEffect explanation
// if (authStatuss === true) {
//     navigate("/)
//     else if (authSlice === false) {
//     navigate("/login)}
// }
// let authvalue = authStatus === true ? true : false

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
    return loader ? null : <>{children} </>

}






