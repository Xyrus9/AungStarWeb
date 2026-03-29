import { getMetadata } from "./services/productService.js";

const { accessoryTypes } = getMetadata();

function AccessoryTypeFilter({ selectedType, onFilterType }) {
  const allTypes = Object.keys(accessoryTypes);

  return (
    <div className="accessory-filter-wrapper">
      <p className="filter-label">Accessory Type / ပစ္စည်းအမျိုးအစား</p>
      <div className="filterBar accessory-filter-bar">
        <button
          className={`filterBtn ${selectedType === "all" ? "active" : ""}`}
          onClick={() => onFilterType("all")}
        >
          All Types / အားလုံး
        </button>
        {allTypes.map((typeKey) => (
          <button
            key={typeKey}
            className={`filterBtn ${selectedType === typeKey ? "active" : ""}`}
            onClick={() => onFilterType(typeKey)}
          >
            {accessoryTypes[typeKey].labelEn} / {accessoryTypes[typeKey].labelMm}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccessoryTypeFilter;
