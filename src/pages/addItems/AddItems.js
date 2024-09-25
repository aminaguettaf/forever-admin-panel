import React, {useState} from 'react';
import './AddItems.css';
import upload from '../../assets/admin_assets/upload_area.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItems = ({token}) => {
  const[image1, setImage1] = useState(false);
  const[image2, setImage2] = useState(false);
  const[image3, setImage3] = useState(false);
  const[image4, setImage4] = useState(false);

  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[price, setPrice] = useState('');
  const[category, setCategory] = useState('Men');
  const[subCategory, setSubCategory] = useState('Topwear');
  const[bestSeller, setBestSeller] = useState(false);
  const[sizes, setSizes] = useState([]);

  const handleSizeClick = (size) => {
    setSizes((prev) => {
      if(prev.includes(size)) {
        // Si la taille est déjà sélectionnée, on la retire
        return prev.filter((s) => s !== size);
      } else {
        // Sinon, on l'ajoute à la liste
        return [...prev, size];
      }
    });
  };

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post('http://localhost:4000/api/product/add', formData, {headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='add-items'>
      <form onSubmit={onSubmitHandler} className='container py-4'>
        <div className='mb-4'>
          <p className='fw-bold mb-2'>Upload image</p>
          <div className='upload-container'> 
            <div>
              <label for='image1'>
              {image1 ?  
                <img src={URL.createObjectURL(image1)} alt=''/>:
                <img src={upload} alt=''/>
              }
              </label>
              <input onChange={(e)=>setImage1(e.target.files[0])} id='image1' type='file' hidden/>
            </div>
            <div>
              <label for='image2'>
              {image2 ?  
                <img src={URL.createObjectURL(image2)} alt=''/>:
                <img src={upload} alt=''/>
              }
              </label>
              <input onChange={(e)=>setImage2(e.target.files[0])} id='image2' type='file' hidden/>
            </div>
            <div>
              <label for='image3'>
              {image3 ?  
                <img src={URL.createObjectURL(image3)} alt=''/>:
                <img src={upload} alt=''/>
              }
              </label>
              <input onChange={(e)=>setImage3(e.target.files[0])} id='image3' type='file' hidden/>
            </div>
            <div>
              <label for='image4'>
              {image4 ?  
                <img src={URL.createObjectURL(image4)} alt=''/>:
                <img src={upload} alt=''/>
              }
              </label>
              <input onChange={(e)=>setImage4(e.target.files[0])} id='image4' type='file' hidden/>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <p className='fw-bold mb-2'>Product name</p>
          <input className='w-100 p-2' type='text' onChange={(e)=>setName(e.target.value)} value={name} name='name'  placeholder='Product name'/>
        </div>
        <div className='mb-4'>
          <p className='fw-bold mb-2'>Product description</p>
          <input className='w-100 p-2' onChange={(e)=>setDescription(e.target.value)} value={description} name='description' type='text' placeholder='Product description'/>
        </div>
        <div className='prod-infos mb-4'>
          <div>
            <p className='fw-bold mb-2'>Product category</p>
            <select onChange={(e)=>setCategory(e.target.value)} className='p-2'>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>
          <div>
            <p className='fw-bold mb-2'>Sub category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} className='p-2'>
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>
          </div>
          <div>
            <p className='fw-bold mb-2'>Product price</p>
            <input className='p-2' onChange={(e)=>setPrice(e.target.value)} value={price} name='price' type='text' placeholder='25'/>
          </div>
        </div>
        <div className='mb-4'>
          <p className='fw-bold mb-2'>Product sizes</p>
          <div className='sizes d-flex align-items-center gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <span
                key={size}
                onClick={() => handleSizeClick(size)}
                className={sizes.includes(size) ? 'active' : ''}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className='d-flex gap-2 mb-4'>
          <input onChange={()=>setBestSeller(prev => !prev)} checked={bestSeller} type='checkbox'/>
          <p>Add to bestseller</p>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddItems
