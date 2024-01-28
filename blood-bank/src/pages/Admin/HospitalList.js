import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';

const HospitalList = () => {
  const [data, setData] = useState([])

  const getDonars = async () => {
    try{
      const {data} = await API.get('/admin/hospital-list')
      console.log(data);
      if(data?.success){
        setData(data?.hospitalData)
      }
    }catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

const handleDelete = async (id) => {
  try{
    let answer = window.prompt('Are you sure , you want to delete this hospital', "Sure")
    if(!answer) return
    const {data} = await API.delete(`/admin/delete-donar/${id}`)
    alert(data?.message)
    window.location.reload();
  } catch(error) {
    console.log(error)
  }
}

  return (
    <Layout>
     <table className="table">
    <thead>
     <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Date</th>
        <th scope="col">Action</th>
      </tr>
     </thead>
      <tbody>
        {data?.map((record) => (
          <tr key={record._id}>
          <td>{record.hospitalName}</td>
          <td>{record.email}</td>
          <td>{record.phone}</td>
          <td>
            {moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}
            </td>
          <td>
            <button className='btn btn-danger' onClick={ () => handleDelete(record._id) }>Delete</button>
          </td>  
          </tr>
        ))}
        </tbody>
        </table>
    </Layout>
  )
}

export default HospitalList
