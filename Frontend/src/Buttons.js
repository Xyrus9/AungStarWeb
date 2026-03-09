import { getMetadata } from "./services/productService";

const { categories } = getMetadata();

function Buttons({ activeCategory, onFilter }) {
    return (
        <div className="category-filter-wrapper">
            <p className="filter-label">Category / အမျိုးအစား</p>
            <div className="filterBar">
                {categories.map((category) => (
                    <button
                        key={category.key}
                        className={`filterBtn ${activeCategory === category.key ? 'active' : ''}`}
                        onClick={() => onFilter(category.key)}
                    >
                        {category.labelEn} / {category.labelMm}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Buttons;

