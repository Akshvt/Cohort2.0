import React from 'react'
import {RouterProvider} from "react-router"
import {AuthProvider} from "./features/auth/auth.context"
import { router } from "./app.routes"
import "./features/shared/global.scss"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
