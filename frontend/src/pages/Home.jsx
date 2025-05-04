import React from 'react'
import MainBanner from '../components/mainBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'
import Footer from '../components/footer'


const Home =()=>{
  return(
    <div className='mt-10'> 
    
 <MainBanner/>
 <Categories/>
 <Bestseller/>
 <BottomBanner/>
 <Newsletter/>

    </div>
  )
}
export default Home
