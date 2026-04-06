import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateProduct } from '../services/api.js';
import { getProductById } from '../services/api.js';
import './AdminDashboard.css';

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
    <div className='admin-page'>
      <div className='admin-shell'>
        <header className='admin-header'>
          <h1 className='admin-heading'>Edit Product</h1>
          <p className='admin-subtitle'>Update existing product information without changing catalog structure.</p>
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
                placeholder={product?.name || 'Enter name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='admin-form-field'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.category || 'Enter category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='admin-form-field'>
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type='number'
                placeholder={product?.price || 'Enter price'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='admin-form-field'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.image || 'Enter image url'}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='maker' className='admin-form-field'>
              <Form.Label>Maker</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.maker || 'Enter maker'}
                value={maker}
                onChange={(e) => setMaker(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='accessoryType' className='admin-form-field'>
              <Form.Label>Accessory Type</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.accessoriesType || 'Enter accessories type'}
                value={accessoriesType}
                onChange={(e) => setAccessoriesType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='goldType' className='admin-form-field'>
              <Form.Label>Gold Type</Form.Label>
              <Form.Control
                type='text'
                placeholder={product?.goldType || 'Enter gold type'}
                value={goldType}
                onChange={(e) => setGoldType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='admin-form-field admin-col-span-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder={product?.description || 'Enter description'}
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;