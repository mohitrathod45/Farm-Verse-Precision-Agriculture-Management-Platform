/**
 * Utility helper to map crop names to local static image paths in public/images/crops/
 * Handles spelling variations (e.g. "Tomoto" -> tomato.jpg) and formatting (e.g. "Ground nut" -> groundnut.jpg)
 */

const DEFAULT_CROP_IMAGE = '/images/crops/default-crop.jpg';

const CROP_IMAGE_MAP = {
  // Rice
  rice: '/images/crops/rice.jpg',
  paddy: '/images/crops/rice.jpg',

  // Wheat
  wheat: '/images/crops/wheat.jpg',

  // Maize / Corn
  maize: '/images/crops/maize.jpg',
  corn: '/images/crops/maize.jpg',

  // Tomato & Spelling Variations
  tomato: '/images/crops/tomato.jpg',
  tomatoes: '/images/crops/tomato.jpg',
  tomoto: '/images/crops/tomato.jpg',
  tomotos: '/images/crops/tomato.jpg',
  tamato: '/images/crops/tomato.jpg',
  tomatto: '/images/crops/tomato.jpg',

  // Groundnut & Spacing Variations
  groundnut: '/images/crops/groundnut.jpg',
  'ground nut': '/images/crops/groundnut.jpg',
  ground_nut: '/images/crops/groundnut.jpg',
  'ground-nut': '/images/crops/groundnut.jpg',
  groundnuts: '/images/crops/groundnut.jpg',
  'ground nuts': '/images/crops/groundnut.jpg',
  peanut: '/images/crops/groundnut.jpg',
  peanuts: '/images/crops/groundnut.jpg',

  // Banana
  banana: '/images/crops/banana.jpg',
  bananas: '/images/crops/banana.jpg',

  // Sugarcane
  sugarcane: '/images/crops/sugarcane.jpg',
  'sugar cane': '/images/crops/sugarcane.jpg',
  'sugar-cane': '/images/crops/sugarcane.jpg',

  // Cotton
  cotton: '/images/crops/cotton.jpg',

  // Dragon Fruit
  'dragon fruit': '/images/crops/dragon-fruit.jpg',
  'dragon-fruit': '/images/crops/dragon-fruit.jpg',
  dragonfruit: '/images/crops/dragon-fruit.jpg',
  dragon: '/images/crops/dragon-fruit.jpg',

  // Potato
  potato: '/images/crops/potato.jpg',
  potatoes: '/images/crops/potato.jpg',

  // Onion
  onion: '/images/crops/onion.jpg',
  onions: '/images/crops/onion.jpg',
};

/**
 * Returns the corresponding image URL for a given crop name.
 * Falls back to DEFAULT_CROP_IMAGE if no match is found.
 * 
 * @param {string} cropName 
 * @returns {string} Image path
 */
export const getCropImage = (cropName) => {
  if (!cropName || typeof cropName !== 'string') {
    return DEFAULT_CROP_IMAGE;
  }

  const rawLower = cropName.trim().toLowerCase();
  const stripped = rawLower.replace(/[\s\-_]+/g, '');

  // 1. Direct key match on raw lowercase string
  if (CROP_IMAGE_MAP[rawLower]) {
    return CROP_IMAGE_MAP[rawLower];
  }

  // 2. Direct key match on stripped string
  if (CROP_IMAGE_MAP[stripped]) {
    return CROP_IMAGE_MAP[stripped];
  }

  // 3. Partial key match
  for (const [key, path] of Object.entries(CROP_IMAGE_MAP)) {
    const keyStripped = key.replace(/[\s\-_]+/g, '');
    if (stripped.includes(keyStripped) || keyStripped.includes(stripped)) {
      return path;
    }
  }

  // 4. Robust Keyword Fallbacks for common typos or names
  if (stripped.includes('tomat') || stripped.includes('tomot') || stripped.includes('tamat')) {
    return '/images/crops/tomato.jpg';
  }
  if (stripped.includes('ground') || stripped.includes('peanut')) {
    return '/images/crops/groundnut.jpg';
  }
  if (stripped.includes('dragon')) {
    return '/images/crops/dragon-fruit.jpg';
  }
  if (stripped.includes('sugar') || stripped.includes('cane')) {
    return '/images/crops/sugarcane.jpg';
  }
  if (stripped.includes('rice') || stripped.includes('paddy')) {
    return '/images/crops/rice.jpg';
  }
  if (stripped.includes('wheat')) {
    return '/images/crops/wheat.jpg';
  }
  if (stripped.includes('maize') || stripped.includes('corn')) {
    return '/images/crops/maize.jpg';
  }
  if (stripped.includes('potat')) {
    return '/images/crops/potato.jpg';
  }
  if (stripped.includes('onion')) {
    return '/images/crops/onion.jpg';
  }
  if (stripped.includes('cotton')) {
    return '/images/crops/cotton.jpg';
  }
  if (stripped.includes('banan')) {
    return '/images/crops/banana.jpg';
  }

  return DEFAULT_CROP_IMAGE;
};

export { DEFAULT_CROP_IMAGE };
