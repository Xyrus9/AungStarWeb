export const getTodayGoldPriceSnapshot = () => ({
  titleEn: 'Today Price',
  titleMm: 'ယနေ့ရွှေစျေး',
  date: new Date().toISOString().slice(0, 10),
  prices: [
    {
      goldTypeMm: '16ပဲရည် (အခေါက်)',
      goldTypeEn: 'Pure 16 Pae',
      priceMMK: 10234920,
    },
    {
      goldTypeMm: '15ပဲရည်',
      goldTypeEn: '15 Pae',
      priceMMK: 9595238,
    },
    {
      goldTypeMm: '14ပဲရည်',
      goldTypeEn: '14 Pae',
      priceMMK: 8955555,
    },
    {
      goldTypeMm: '13ပဲရည်',
      goldTypeEn: '13 Pae',
      priceMMK: 8315872,
    },
  ],
});
