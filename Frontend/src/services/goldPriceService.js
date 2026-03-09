// Prototype source of truth for gold prices.
// TODO: Replace with admin dashboard API feed once backend endpoint is ready.

export const goldPricePrototype = {
  titleEn: 'Today Price',
  titleMm: 'ယနေ့ရွှေစျေး',
  date: '21 Jan 2026',
  prices: [
    { goldType: '16ပဲရည် (အခေါက်)', labelEn: 'Pure 16 Pae', price: 10234920 },
    { goldType: '15ပဲရည်', labelEn: '15 Pae', price: 9595238 },
    { goldType: '14ပဲရည်', labelEn: '14 Pae', price: 8955555 },
    { goldType: '13ပဲရည်', labelEn: '13 Pae', price: 8315872 },
  ],
};

export const getGoldPrice = () => goldPricePrototype;
