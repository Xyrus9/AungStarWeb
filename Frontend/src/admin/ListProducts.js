import { useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaSync } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct } from '../services/api.js';
import { useProducts } from '../hooks/useProducts.js';

const ListProducts = () => {
    const { products, refreshProducts } = useProducts();
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleDelete = async (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (!confirmed) return;

        try {
            setDeletingProductId(productId);
            await deleteProduct(productId);
            await refreshProducts();
        } catch (error) {
            window.alert(error?.message || 'Failed to delete product');
        } finally {
            setDeletingProductId(null);
        }
    };

    return (
        <>
            <Row className = "align-items-center"> 
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className = "text-right">
                    <Button className = "my-3 mr-2" onClick={refreshProducts}>
                        <FaSync /> Refresh
                    </Button>
                    <LinkContainer to = '/admin/product/create'>
                        <Button className = "my-3">
                            <FaPlus /> Create Product
                        </Button>
                    </LinkContainer>
                   
                </Col>
            </Row>
          
                <Table striped bordered hover responsive className = "table-sm">
                    <thead>
                        <tr>
                   
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Maker</th>
                            <th>Accessory Type</th>
                            <th>Gold Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const productId = product.id || product._id;

                            return (
                                <tr key = {productId}>
                                   
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.maker}</td>
                                    <td>{product.accessoryType}</td>
                                    <td>{product.goldType}</td>
                                    <td>
                                        <LinkContainer to = {`/admin/product/${productId}/edit`}>
                                            <Button variant = "light" className = "btn-sm">
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        <Button
                                            variant = "danger"
                                            className = "btn-sm"
                                            onClick={() => handleDelete(productId)}
                                            disabled={deletingProductId === productId}
                                        >
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                
        </>
    );
}

export default ListProducts;