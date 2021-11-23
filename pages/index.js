import React from 'react'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <nav className="navbar bg-white flex items-center justify-between p-3">
        <a className="navbar-brand flex items-center" href="/">
          <img src="logo.png" alt="" width="58" height="58" />
          <strong className="ml-5" style={{"font-size": "27px"}}>Leasy</strong>
        </a>
        <div>
          <a className="mr-5 text-white rounded-md bg-blue-700 p-3" href="login" role="button">LOG IN</a>
          <a className="text-white rounded-md bg-blue-700 p-3" href="signup" role="button">SIGN UP</a>
        </div>
      </nav>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-10">¡No repitas compras nunca más!</h1>

        <div className="sign-btn mb-10 mt-5"> 
          <a className="btn btn-primary btn-lg p-3 text-white rounded-md" style={{"background-color": "rgb(7, 7, 124)"}} href="login" role="button" ><strong>COMIENZA YA!</strong></a>
        </div>

        <img src="banner.JPG" alt="" height="150px" style={{"margin-left": "4%", "margin-top": "10px", "max-width": "90%"}} />
        <div className="flex max-w-full">
          <img src="BANNER1.JPG" alt="" height="300px" width="550px" style={{"margin-left": "4%", "margin-top": "10px", "max-width": "45%"}} />
          <img src="banner2.JPG" alt="" height="300px" width="550px" style={{"margin-left": "4%", "margin-top": "10px", "max-width": "45%"}} />
        </div>
      </div>
      
    </Layout>
  )
}
