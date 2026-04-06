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
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
        setName(data.name || '');
        setCategory(data.category || '');
        setPrice(data.price || 0);
        setCurrentImage(data.image || '');
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

      await updateProduct(productId, formData);
      toast.success('Product updated successfully');
      navigate('/admin');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to update product');
    } finally {
      setUploading(false);
    }
  };



  return (
    <div className='admin-page'>
      <div className='admin-shell'>
        <header className='admin-header'>
          <h1 className='admin-heading'>Edit Product</h1>
          <p className='admin-subtitle'>Update product details in the admin catalog.</p>
        </header>

        <Link to='/admin' className='admin-btn admin-btn-primary admin-back-btn'>
          Back
        </Link>
     
        <Form onSubmit={submitHandler} className='admin-form'>
          <div className='admin-form-grid'>
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
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              ></Form.Control>
              {currentImage && !image && (
                <Form.Text className="text-muted">
                  Current image: {currentImage}
                </Form.Text>
              )}
              {image && (
                <Form.Text className="text-muted">
                  New image selected: {image.name}
                </Form.Text>
              )}
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
                type='text'
                placeholder={product?.description || 'Enter description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className='admin-form-footer admin-col-span-2'>
              <Button
                type='submit'
                variant='primary'
                disabled={uploading}
              >
                {uploading ? 'Updating...' : 'Update Product'}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProducts;