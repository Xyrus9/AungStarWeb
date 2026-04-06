import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateProduct } from '../services/api.js';
import { getProductById } from '../services/api.js';

const EditProducts = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [maker, setMaker] = useState('');
  const [accessoriesType, setAccessoriesType] = useState('');
  const [goldType, setGoldType] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        setName(data.name || '');
        setCategory(data.category || '');
        setPrice(data.price || 0);
        setImage(data.image || '');
        setMaker(data.maker || '');
        setAccessoriesType(data.accessoriesType || '');
        setGoldType(data.goldType || '');
        setDescription(data.description || '');
      } catch (err) {
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, {
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
    <>
      <Link to='/admin' className='btn btn-light my-3'>
        Go Back
      </Link>
     
        <h1>Edit Product</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.name || 'Enter name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.category || 'Enter category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number'
                placeholder={product?.price || 'Enter price'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.image || 'Enter image url'}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='maker'>
              <Form.Label>Maker</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.maker || 'Enter maker'}
                value={maker}
                onChange={(e) => setMaker(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accessoryType'>
              <Form.Label>Accessory Type</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.accessoriesType || 'Enter accessories type'}
                value={accessoriesType}
                onChange={(e) => setAccessoriesType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='goldType'>
              <Form.Label>Gold Type</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.goldType || 'Enter gold type'}
                value={goldType}
                onChange={(e) => setGoldType(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.description || 'Enter description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
   
    </>
  );
};

export default EditProducts;