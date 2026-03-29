import {
  getProducts as fetchProducts,
  getProductById as fetchProductById,
} from './api.js';

export const accessoryTypes = {
  ring: { labelEn: 'Ring', labelMm: 'လက်စွပ်' },
  earring: { labelEn: 'Earring', labelMm: 'နားဆွဲ' },
  earstub: { labelEn: 'Ear Stud', labelMm: 'နားကပ်' },
  earhoop: { labelEn: 'Ear Hoop', labelMm: 'နားကွင်း' },
  locket: { labelEn: 'Locket', labelMm: 'ဆွဲသီး' },
  necklace: { labelEn: 'Necklace', labelMm: 'ဆွဲကြိုး' },
  handchain: { labelEn: 'Hand Chain', labelMm: 'ဟန်းခိန်း' },
  footchain: { labelEn: 'Foot Chain', labelMm: 'ဖုခိန်း' },
  hairclip: { labelEn: 'Hair Clip', labelMm: 'ကလစ်' },
  bangle: { labelEn: 'Bangle', labelMm: 'လက်ကွင်း' },
  bracelet: { labelEn: 'Bracelet', labelMm: 'လက်ကွင်း' },
  pendant: { labelEn: 'Pendant', labelMm: 'ဆွဲသီး' },
};

export const goldTypes = {
  '16_pae': { labelEn: '16 Pae (Pure)', labelMm: '16ပဲရယ် (အခောက်)' },
  '15_pae': { labelEn: '15 Pae', labelMm: '15ပဲရယ်' },
  '14_2_pyae': { labelEn: '14 Pae 2 Pyae', labelMm: '14ပဲ2ပြားရယ်' },
  '14_pae': { labelEn: '14 Pae', labelMm: '14ပဲရယ်' },
  '13_pae': { labelEn: '13 Pae', labelMm: '13ပဲရယ်' },
};

export const jewelryTypes = {
  gemstone: { labelEn: 'Gemstone', labelMm: 'ကျောက်မျက်' },
  pearl: { labelEn: 'Pearl', labelMm: 'ပလဲ' },
  mixed_metal: { labelEn: 'Mixed Metal', labelMm: 'မန္ထလဲရွှ' },
  enamel: { labelEn: 'Enamel', labelMm: 'အင္ကားရေး' },
  fashion: { labelEn: 'Fashion', labelMm: 'ဖေရျမ်း' },
};

const categories = [
  { key: 'all', labelEn: 'All', labelMm: 'အားလုံး' },
  { key: 'gold', labelEn: 'Gold', labelMm: 'ရွှေထည်' },
  { key: 'jewelry', labelEn: 'Jewelry', labelMm: 'ကျောက်ထည်' },
  { key: 'diamond', labelEn: 'Diamonds', labelMm: 'စိန်ထည်' },
];

const metadataMaps = {
  category: categories,
  accessoriesType: accessoryTypes,
  goldType: goldTypes,
  jewelryType: jewelryTypes,
};

const normalize = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');

const isLikelyObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value ?? ''));

const uniqueNonEmpty = (values) => {
  const seen = new Set();

  return values.filter((value) => {
    const strValue = toSafeString(value).trim();
    if (!strValue || seen.has(strValue)) return false;
    seen.add(strValue);
    return true;
  });
};

const extractObjectCandidates = (value) => {
  if (!value || typeof value !== 'object') return [];

  return uniqueNonEmpty([
    value._id,
    value.id,
    value.key,
    value.value,
    value.slug,
    value.code,
    value.name,
    value.label,
    value.labelEn,
    value.labelMm,
    value.title,
    value.category,
    value.accessoriesType,
    value.accessoryType,
    value.goldType,
    value.goldPurity,
    value.jewelryType,
  ]);
};

const buildEntries = (mapOrList) => {
  if (Array.isArray(mapOrList)) {
    return mapOrList
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        key: toSafeString(item.key),
        labelEn: toSafeString(item.labelEn || item.name || item.label),
        labelMm: toSafeString(item.labelMm),
        id: item._id ?? item.id ?? null,
      }));
  }

  return Object.entries(mapOrList || {}).map(([key, value]) => ({
    key,
    labelEn: toSafeString(value?.labelEn),
    labelMm: toSafeString(value?.labelMm),
    id: value?._id ?? value?.id ?? null,
  }));
};

const resolveMappedField = (fieldName, directValue, linkedValue) => {
  const entries = buildEntries(metadataMaps[fieldName]);
  const candidates = uniqueNonEmpty([
    directValue,
    linkedValue,
    ...extractObjectCandidates(directValue),
    ...extractObjectCandidates(linkedValue),
  ]);

  const fallbackLabel =
    candidates.find((candidate) => !isLikelyObjectId(candidate)) || '';

  for (const entry of entries) {
    const entryTokens = uniqueNonEmpty([
      entry.key,
      entry.labelEn,
      entry.labelMm,
      entry.id,
    ]).map(normalize);

    const matchedCandidate = candidates.find((candidate) => {
      const normalizedCandidate = normalize(candidate);
      return entryTokens.includes(normalizedCandidate);
    });

    if (matchedCandidate) {
      return {
        key: entry.key,
        label: entry.labelEn || entry.key,
      };
    }
  }

  return {
    key: toSafeString(directValue || linkedValue || ''),
    label: fallbackLabel,
  };
};

// Adapter helpers: keep UI field names stable regardless of backend response shape.
const extractId = (value) => {
  if (value === null || value === undefined) return null;

  if (typeof value === 'object') {
    return value._id ?? value.id ?? value.key ?? value.value ?? null;
  }

  return value;
};

const toSafeString = (value) => {
  if (value === null || value === undefined) return '';
  return String(value);
};

const resolveOptionalType = (directValue, linkedValue) => {
  if (directValue !== null && directValue !== undefined && directValue !== '') {
    return directValue;
  }

  const linkedId = extractId(linkedValue);
  return linkedId ?? undefined;
};

export const adaptProduct = (rawProduct) => {
  if (!rawProduct || typeof rawProduct !== 'object') {
    return null;
  }

  const id = rawProduct.id ?? rawProduct._id ?? extractId(rawProduct.productId);
  const resolvedCategory = resolveMappedField(
    'category',
    rawProduct.category,
    rawProduct.categoryId
  );
  const resolvedAccessoryType = resolveMappedField(
    'accessoriesType',
    rawProduct.accessoriesType,
    rawProduct.accessoryTypeId
  );
  const resolvedGoldType = resolveMappedField(
    'goldType',
    rawProduct.goldType,
    rawProduct.goldPurityId
  );
  const resolvedJewelryType = resolveMappedField(
    'jewelryType',
    rawProduct.jewelryType,
    rawProduct.jewelryTypeId
  );

  const adapted = {
    id: id ?? null,
    name: toSafeString(rawProduct.name),
    category: toSafeString(resolvedCategory.key),
    categoryLabel: toSafeString(resolvedCategory.label || resolvedCategory.key),
    price: Number(rawProduct.price ?? 0),
    maker: toSafeString(rawProduct.maker),
    accessoriesType: toSafeString(resolvedAccessoryType.key),
    accessoriesTypeLabel: toSafeString(
      resolvedAccessoryType.label || resolvedAccessoryType.key
    ),
    goldType:
      toSafeString(resolvedGoldType.key) ||
      resolveOptionalType(rawProduct.goldType, rawProduct.goldPurityId),
    goldTypeLabel: toSafeString(resolvedGoldType.label || resolvedGoldType.key),
    jewelryType:
      toSafeString(resolvedJewelryType.key) ||
      resolveOptionalType(rawProduct.jewelryType, rawProduct.jewelryTypeId),
    jewelryTypeLabel: toSafeString(
      resolvedJewelryType.label || resolvedJewelryType.key
    ),
    description: toSafeString(rawProduct.description),
    image: toSafeString(rawProduct.image),
    showMore: Boolean(rawProduct.showMore),
  };

  return adapted;
};

export const adaptProducts = (rawProducts) => {
  if (!Array.isArray(rawProducts)) return [];
  return rawProducts.map(adaptProduct).filter(Boolean);
};

export const getAllProducts = async () => {
  const products = await fetchProducts();
  return adaptProducts(products);
};

export const getProductById = async (id) => {
  const product = await fetchProductById(id);
  return adaptProduct(product);
};

export const filterProducts = async (filters = {}) => {
  const products = await getAllProducts();

  return products.filter((product) => {
    const matchesCategory =
      !filters.category ||
      filters.category === 'all' ||
      product.category === filters.category;
    const matchesAccessoriesType =
      !filters.accessoriesType ||
      filters.accessoriesType === 'all' ||
      product.accessoriesType === filters.accessoriesType;
    const matchesGoldType =
      !filters.goldType || product.goldType === filters.goldType;
    const matchesJewelryType =
      !filters.jewelryType || product.jewelryType === filters.jewelryType;

    return (
      matchesCategory &&
      matchesAccessoriesType &&
      matchesGoldType &&
      matchesJewelryType
    );
  });
};

export const createProduct = async (productData) => {
  throw new Error('Creating products from the frontend is not implemented yet');
};

export const updateProduct = async (id, updates) => {
  throw new Error('Updating products from the frontend is not implemented yet');
};

export const deleteProduct = async (id) => {
  throw new Error('Deleting products from the frontend is not implemented yet');
};

export const getMetadata = () => {
  return {
    accessoryTypes,
    goldTypes,
    jewelryTypes,
    categories,
  };
};

const productService = {
  getAllProducts,
  getProductById,
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getMetadata,
};

export default productService;
