import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import Buttons from "./Buttons";
import AccessoryTypeFilter from "./AccessoryTypeFilter";
import Jewelry from "./Jewelry";

const goldRates = [
  { label: "Yangon 24K (1 tical)", price: "MMK 3,456,000", note: "Update daily" },
  { label: "Mandalay 24K (1 tical)", price: "MMK 3,448,000", note: "Update daily" },
  { label: "21K Retail", price: "MMK 2,890,000", note: "Sample rate" },
];

function Home() {
  const { products, loading, error, toggleShowMore } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedAccessoriesType, setSelectedAccessoriesType] = useState("all");

  const filteredItems = products.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesType = selectedAccessoriesType === "all" || item.accessoriesType === selectedAccessoriesType;
    return matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <div className="page">
        <div style={{ padding: '100px 32px', textAlign: 'center' }}>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div style={{ padding: '100px 32px', textAlign: 'center' }}>
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Aung Myay Treasure</p>
          <h1>Trusted gold and diamond specialists in Myanmar.</h1>
          <p className="subhead">
            Browse curated pieces, check today's local gold rates, and contact us to
            reserve in-store. No online checkout - every order is handled personally.
          </p>
        </div>
        <div className="hero-badge">Yangon | Mandalay | Nationwide delivery</div>
      </section>

      <section className="gold-rates">
        <div className="section-header">
          <div>
            <p className="eyebrow">Daily Price Board</p>
            <h2>Myanmar gold prices</h2>
          </div>
          <p className="disclaimer">Sample numbers shown - replace with today's rates before publishing.</p>
        </div>
        <div className="price-grid">
          {goldRates.map((rate) => (
            <div className="price-card" key={rate.label}>
              <p className="price-label">{rate.label}</p>
              <p className="price-value">{rate.price}</p>
              <p className="price-note">{rate.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="catalog">
        <div className="section-header">
          <div>
            <p className="eyebrow">Curated collections</p>
            <h2>Find your piece</h2>
          </div>
          <p className="helper-text">Use filters below to narrow your search.</p>
        </div>
        <Buttons activeCategory={activeCategory} onFilter={setActiveCategory} />
        <AccessoryTypeFilter selectedType={selectedAccessoriesType} onFilterType={setSelectedAccessoriesType} />
        <Jewelry items={filteredItems} onToggle={toggleShowMore} />
      </section>
    </div>
  );
}

export default Home;
