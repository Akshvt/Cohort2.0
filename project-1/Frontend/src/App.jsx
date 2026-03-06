import React from 'react'
import {RouterProvider} from "react-router"
import {AuthProvider} from "./features/auth/auth.context"
import { PostContextProvider } from './features/posts/post.context'
import { router } from "./app.routes"
import "./features/shared/global.scss"

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router}/>
      </PostContextProvider>
      
    </AuthProvider>
  )
}

export default App
