import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { DashBoard } from '../components/DashBoard'

export const Home = () => {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className='flex'>
      <div className='basis-[20%] h-[100vh] '>
        <Sidebar/>
      </div>
      <div className='basis-[80%] border '>
        <DashBoard/>
      </div>
    </div> 
    </>
  )
}
