import { Link } from "react-router-dom";

function Jewelry({ items, onToggle }) {
    return (
        <div className="products">
            {items.map((element) => {
                const { id, name, price, image, description, showMore, category, categoryLabel, maker } = element;
                const preview = description.substring(0, 90);
                return (
                    <div className="productCard" key={id}>
                        <img className="productImage" src={image} alt={name} width="360" height="360" />
                        <div className="productMeta">
                            <p className="pill">{categoryLabel || category}</p>
                            <h3>{name}</h3>
                            <h4>MMK {price.toLocaleString()}</h4>
                        </div>
                        <p className="description">{showMore ? description : `${preview}...`}</p>
                        {showMore && (
                            <p className="maker">Created by: {maker}</p>
                        )}
                        <div className="cardActions">
                            <Link to={`/product/${id}`} className="view-details-link">
                                <button className="seeMore">View details</button>
                            </Link>
                            <Link to="/contactus" className="ctaLink">
                                <button className="ctaBtn">Call to reserve</button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Jewelry;
