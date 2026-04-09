import { useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaSync } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct } from '../services/api.js';
import { useProducts } from '../hooks/useProducts.js';
import './AdminDashboard.css';

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
        <div className='admin-page'>
            <div className='admin-shell'>
                <header className='admin-header'>
                    <h1 className='admin-heading'>Products Dashboard</h1>
                    <p className='admin-subtitle'>Manage catalog details, pricing, and product presentation.</p>
                </header>

                <Row className="align-items-center admin-header-row">
                    <Col>
                        <div className='admin-toolbar-card p-3'>
                            <strong>Total Products: {products.length}</strong>
                        </div>
                    </Col>
                    <Col className="admin-header-actions">
                        <Button className="admin-btn admin-btn-refresh" onClick={refreshProducts}>
                            <FaSync /> Refresh
                        </Button>
                        <LinkContainer to='/admin/product/create'>
                            <Button className="admin-btn admin-btn-primary">
                                <FaPlus /> Create Product
                            </Button>
                        </LinkContainer>
                    </Col>
                </Row>

                <div className='admin-table-card'>
                    <div className='admin-table-wrap'>
                        <Table striped hover responsive className='table-sm admin-table'>
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
                                        <tr key={productId}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>${product.price}</td>
                                            <td>{product.maker}</td>
                                            <td>{product.accessoryType}</td>
                                            <td>{product.goldType}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${productId}/edit`}>
                                                    <Button variant="light" className="admin-btn admin-btn-soft admin-btn-icon">
                                                        <FaEdit /> Edit
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    className="admin-btn admin-btn-danger admin-btn-icon"
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
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ListProducts;