// ProtectRouter.js
import React from 'react'
import { Route, Navigate } from 'react-router-dom'
type Props = {
  children: React.ReactNode
}

const ProtectRouter: React.FC<Props> = ({ children }) => {
  const accessToken = window.sessionStorage.getItem('access-token')

  if (!accessToken) {
    return <Navigate to='/login' />
  }

  return <Route>{children}</Route>
}

export default ProtectRouter
