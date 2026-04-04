import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById as getProductByIdApi } from "./services/api.js";
import { adaptProduct, getMetadata } from "./services/productService.js";
import "./ProductDetail.css";

const { accessoryTypes, goldTypes, jewelryTypes } = getMetadata();

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const rawProduct = await getProductByIdApi(id);
        const normalizedProduct = adaptProduct(rawProduct);

        if (!normalizedProduct) {
          setError("Product not found");
          setProduct(null);
        } else {
          setProduct(normalizedProduct);
        }
      } catch (err) {
        setError(err?.message || "Failed to load product");
        setProduct(null);
      }

      setLoading(false);
    };

    if (!id) {
      setError("Product id is missing");
      setLoading(false);
      return;
    }

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

  const {
    name,
    price,
    image,
    description,
    category,
    categoryLabel,
    maker,
    accessoriesType,
    accessoriesTypeLabel,
    goldType,
    goldTypeLabel,
    jewelryType,
    jewelryTypeLabel,
  } = product;

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
            <p className="pill detail-pill">{categoryLabel || category}</p>
            <h1 className="detail-title">{name}</h1>
            <p className="detail-price">MMK {price.toLocaleString()}</p>
            
            <div className="detail-divider"></div>
            
            <div className="detail-section">
              <h3 className="detail-section-title">Accessories Type</h3>
              <p className="detail-type">
                {accessoriesTypeLabel || accessoryTypes[accessoriesType]?.labelEn || accessoriesType}
                {accessoryTypes[accessoriesType]?.labelMm
                  ? ` / ${accessoryTypes[accessoriesType]?.labelMm}`
                  : ''}
              </p>
            </div>

            {goldType && (
              <div className="detail-section">
                <h3 className="detail-section-title">Gold Purity</h3>
                <p className="detail-type">
                  {goldTypeLabel || goldTypes[goldType]?.labelEn || goldType}
                  {goldTypes[goldType]?.labelMm ? ` / ${goldTypes[goldType]?.labelMm}` : ''}
                </p>
              </div>
            )}

            {jewelryType && (
              <div className="detail-section">
                <h3 className="detail-section-title">Jewelry Style</h3>
                <p className="detail-type">
                  {jewelryTypeLabel || jewelryTypes[jewelryType]?.labelEn || jewelryType}
                  {jewelryTypes[jewelryType]?.labelMm
                    ? ` / ${jewelryTypes[jewelryType]?.labelMm}`
                    : ''}
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
