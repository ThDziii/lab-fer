import React from 'react'
import { routes } from '../routes'
import MyCard from '../components/card'
import Footer from '../components/footer'
import Navbar from '../components/navBar'
// import Navbar from '../components/NavBar'

export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <MyCard></MyCard>
            <Footer/>
        </div>
    )
}
