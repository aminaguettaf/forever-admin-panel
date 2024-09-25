import React, { useEffect, useState } from 'react';
import './ListItems.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListItems = ({token}) => { 
  const[list, setList] = useState([]);

  const fetchList = async()=>{
    try {
      const response = await axios.get('http://localhost:4000/api/product/list');
      console.log(response.data)
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  const removeItem = async(itemId)=>{
    try {
      const response = await axios.post('http://localhost:4000/api/product/remove', {id:itemId}, {headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list-items'>
      <div className='container py-4'>
        <p className='title mb-3'>All products list</p>
        <div className='items-container'>
          <div className='table header p-2'>
            <p>image</p>
            <p>name</p>
            <p>category</p>
            <p>price</p>
            <p>delete</p>
          </div>
          {list.map((item, index)=>{
            return(
              <div key={index} className='table body py-4 px-2'>
                <img src={`http://localhost:4000/images/${item.image[0]}`} alt={item.name} style={{ width: '100px', margin: '10px' }} />
                <p className='name'>{item.name}</p>
                <p className='cat'>{item.category}</p>
                <p className='price'>$ {item.price}</p>
                <i onClick={()=>removeItem(item._id)} class="fa-solid fa-xmark"></i>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ListItems
