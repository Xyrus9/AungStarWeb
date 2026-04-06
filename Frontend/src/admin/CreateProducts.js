import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createProduct } from '../services/api.js';
import './AdminDashboard.css';

const CreateProducts = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [maker, setMaker] = useState('');
  const [accessoriesType, setAccessoriesType] = useState('');
  const [goldType, setGoldType] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProduct( {
        name,
        category,
        price,
        maker,
        accessoriesType,
        goldType,
        image,
        description,
      }); 
      toast.success('Product updated');
      navigate('/admin');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };



  return (
    <div className='admin-page'>
      <div className='admin-shell'>
        <header className='admin-header'>
          <h1 className='admin-heading'>Create Product</h1>
          <p className='admin-subtitle'>Add a new product to the admin catalog with complete details.</p>
        </header>

        <Link to='/admin' className='admin-btn admin-btn-primary admin-back-btn'>
          Back
        </Link>

        <div className='admin-form-card'>
          <Form onSubmit={submitHandler} className='admin-form-grid'>
            <Form.Group controlId='name' className='admin-form-field'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='admin-form-field'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='admin-form-field'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='admin-form-field'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='maker' className='admin-form-field'>
              <Form.Label>Maker</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter maker'
                value={maker}
                onChange={(e) => setMaker(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accessoryType' className='admin-form-field'>
              <Form.Label>Accessory Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter accessories type'
                value={accessoriesType}
                onChange={(e) => setAccessoriesType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='goldType' className='admin-form-field'>
              <Form.Label>Gold Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter gold type'
                value={goldType}
                onChange={(e) => setGoldType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='admin-form-field admin-col-span-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className='admin-form-footer admin-col-span-2'>
              <Button
                type='submit'
                variant='primary'
                className='admin-btn admin-btn-primary'
              >
                Create Product
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;