import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaSync } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useProducts } from '../hooks/useProducts.js';
import './AdminDashboard.css';


const ListProducts = () => {
    const { products, refreshProducts } = useProducts();

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
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan='8'>
                                            <p className='admin-empty-state'>No products available yet. Create your first product to get started.</p>
                                        </td>
                                    </tr>
                                )}
                                {products.map((product) => {
                                    const productId = product.id || product._id;

                                    return (
                                        <tr key={productId}>
                                            <td className='admin-table-title'>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td className='admin-price'>${product.price}</td>
                                            <td>{product.maker}</td>
                                            <td>{product.accessoryType}</td>
                                            <td>{product.goldType}</td>
                                            <td className='admin-action-cell'>
                                                <LinkContainer to={`/admin/product/${productId}/edit`}>
                                                    <Button variant='light' className='btn-sm admin-btn admin-btn-soft'>
                                                        <FaEdit />
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                            <td className='admin-action-cell'>
                                                <Button variant='danger' className='btn-sm admin-btn admin-btn-danger'>
                                                    <FaTrash />
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