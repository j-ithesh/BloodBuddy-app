import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
const AdminHome = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <Layout>
     <div className='container'>
       <div className='d-flex flex-column mt-4'>
         <h1>Hey Admin  <i className='text-danger'>{user?.name}</i></h1>
         <h3 className='text-success'>Manage Blood Buddy </h3>
         <hr></hr>
         <p>
            
Introducing the innovative Blood Buddy app, a revolutionary tool designed to streamline and enhance the blood donation process. This user-friendly application serves as a virtual hub connecting blood donors with recipients in need, creating a dynamic network of potential lifesavers. Users can easily register as donors, providing essential information such as blood type and location. The app employs smart algorithms to match compatible donors with urgent requests, ensuring a swift and efficient response to critical situations. With real-time notifications, users stay informed about nearby blood donation drives, emergencies, and personalized opportunities to make a difference. Blood Buddy not only facilitates the act of giving but also fosters a sense of community and shared responsibility for saving lives. It's a digital platform that harnesses technology to make a positive impact on the vital and time-sensitive realm of blood donation.
         </p>
       </div>
     </div>
    </Layout>
  )
}

export default AdminHome
