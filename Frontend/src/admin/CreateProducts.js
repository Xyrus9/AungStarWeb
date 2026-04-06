import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createProduct } from '../services/api.js';

const CreateProducts = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [maker, setMaker] = useState('');
  const [accessoriesType, setAccessoriesType] = useState('');
  const [goldType, setGoldType] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('maker', maker);
      formData.append('accessoriesType', accessoriesType);
      formData.append('goldType', goldType);
      formData.append('description', description);

      if (image) {
        formData.append('image', image);
      }

      await createProduct(formData);
      toast.success('Product created successfully');
      navigate('/admin');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to create product');
    } finally {
      setUploading(false);
    }
  };



  return (
    <>
      <Link to='/admin' className='btn btn-light my-3'>
        Go Back
      </Link>
     
        <h1>Create Product</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              ></Form.Control>
              {image && (
                <Form.Text className="text-muted">
                  Selected: {image.name}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='maker'>
              <Form.Label>Maker</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter maker'
                value={maker}
                onChange={(e) => setMaker(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accessoryType'>
              <Form.Label>Accessory Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter accessories type'
                value={accessoriesType}
                onChange={(e) => setAccessoriesType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='goldType'>
              <Form.Label>Gold Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter gold type'
                value={goldType}
                onChange={(e) => setGoldType(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
              disabled={uploading}
            >
              {uploading ? 'Creating...' : 'Create Product'}
            </Button>
          </Form>
   
    </>
  );
};

export default CreateProducts;