import { getGoldPrices } from './api.js';

const DEFAULT_TITLE_EN = 'Today Price';
const DEFAULT_TITLE_MM = 'ယနေ့ရွှေစျေး';

function toSafeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toSafeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export async function getGoldPrice() {
  const payload = await getGoldPrices();
  const prices = Array.isArray(payload?.prices)
    ? payload.prices.map((item) => ({
        goldTypeMm: toSafeString(item?.goldTypeMm || item?.goldType),
        goldTypeEn: toSafeString(item?.goldTypeEn || item?.labelEn),
        priceMMK: toSafeNumber(item?.priceMMK ?? item?.price),
      }))
    : [];

  return {
    titleEn: toSafeString(payload?.titleEn) || DEFAULT_TITLE_EN,
    titleMm: toSafeString(payload?.titleMm) || DEFAULT_TITLE_MM,
    date: toSafeString(payload?.date) || getTodayIsoDate(),
    prices,
  };
}
