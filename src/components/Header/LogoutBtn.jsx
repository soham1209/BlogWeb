import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='bg-clr2 mr-4 ml-4 mt-2 px-6 py-1 rounded-full shadow-[2px_3px_6px_0_rgba(0,0,0,0.6)] hover:shadow-none transition-shadow duration-300 '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn