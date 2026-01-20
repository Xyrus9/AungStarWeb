import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "./services/productService";
import { accessoryTypes, goldTypes, jewelryTypes } from "./data";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const result = await getProductById(id);
      
      if (result.success) {
        setProduct(result.data);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="detail-container">
          <p style={{ textAlign: 'center', padding: '100px 0' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || error || !product) {
    return (
      <div className="page">
        <div className="detail-container">
          <h1>{error || "Product not found"}</h1>
          <Link to="/" className="back-link">← Back to shop</Link>
        </div>
      </div>
    );
  }

  const { name, price, image, description, category, maker, accessoriesType, goldType, jewelryType } = product;

  return (
    <div className="page">
      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="detail-grid">
          <div className="detail-image-wrapper">
            <img src={image} alt={name} className="detail-image" />
          </div>

          <div className="detail-content">
            <p className="pill detail-pill">{category}</p>
            <h1 className="detail-title">{name}</h1>
            <p className="detail-price">MMK {price.toLocaleString()}</p>
            
            <div className="detail-divider"></div>
            
            <div className="detail-section">
              <h3 className="detail-section-title">Type</h3>
              <p className="detail-type">
                {accessoryTypes[accessoriesType]?.labelEn} / {accessoryTypes[accessoriesType]?.labelMm}
              </p>
            </div>

            {goldType && (
              <div className="detail-section">
                <h3 className="detail-section-title">Gold Purity</h3>
                <p className="detail-type">
                  {goldTypes[goldType]?.labelEn} / {goldTypes[goldType]?.labelMm}
                </p>
              </div>
            )}

            {jewelryType && (
              <div className="detail-section">
                <h3 className="detail-section-title">Jewelry Style</h3>
                <p className="detail-type">
                  {jewelryTypes[jewelryType]?.labelEn} / {jewelryTypes[jewelryType]?.labelMm}
                </p>
              </div>
            )}

            <div className="detail-section">
              <h3 className="detail-section-title">Description</h3>
              <p className="detail-description">{description}</p>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Crafted by</h3>
              <p className="detail-maker">{maker}</p>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-actions">
              <Link to="/contactus" className="detail-cta-link">
                <button className="detail-cta-btn">Call to reserve this piece</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
