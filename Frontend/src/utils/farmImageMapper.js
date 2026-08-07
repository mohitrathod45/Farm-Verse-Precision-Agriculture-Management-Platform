/**
 * Utility helper to map farm names to local static image paths in public/images/farms/
 */

const DEFAULT_FARM_IMAGE = '/images/farms/default-farm.jpg';

const FARM_IMAGE_MAP = {
  // Green Valley Farm
  'green valley farm': '/images/farms/green-valley.jpg',
  'green valley': '/images/farms/green-valley.jpg',
  greenvalley: '/images/farms/green-valley.jpg',

  // Sunrise Farm
  'sunrise farm': '/images/farms/sunrise-farm.jpg',
  sunrise: '/images/farms/sunrise-farm.jpg',

  // Organic Farm
  'organic farm': '/images/farms/organic-farm.jpg',
  organic: '/images/farms/organic-farm.jpg',

  // Natural Farm
  'natural farm': '/images/farms/natural-farm.jpg',
  natural: '/images/farms/natural-farm.jpg',

  // Mountain Farm
  'mountain farm': '/images/farms/mountain-farm.jpg',
  mountain: '/images/farms/mountain-farm.jpg',

  // River Farm
  'river farm': '/images/farms/river-farm.jpg',
  river: '/images/farms/river-farm.jpg',

  // Golden Harvest Farm
  'golden harvest farm': '/images/farms/golden-harvest.jpg',
  'golden harvest': '/images/farms/golden-harvest.jpg',
  golden: '/images/farms/golden-harvest.jpg',

  // Eco Farm
  'eco farm': '/images/farms/eco-farm.jpg',
  eco: '/images/farms/eco-farm.jpg',
};

/**
 * Returns the corresponding image URL for a given farm name.
 * Falls back to DEFAULT_FARM_IMAGE if no match is found.
 * 
 * @param {string} farmName 
 * @returns {string} Image path
 */
export const getFarmImage = (farmName) => {
  if (!farmName || typeof farmName !== 'string') {
    return DEFAULT_FARM_IMAGE;
  }

  const rawLower = farmName.trim().toLowerCase();
  const stripped = rawLower.replace(/[\s\-_]+/g, '');

  // 1. Direct key match on raw lowercase string
  if (FARM_IMAGE_MAP[rawLower]) {
    return FARM_IMAGE_MAP[rawLower];
  }

  // 2. Direct key match on stripped string
  if (FARM_IMAGE_MAP[stripped]) {
    return FARM_IMAGE_MAP[stripped];
  }

  // 3. Partial key match
  for (const [key, path] of Object.entries(FARM_IMAGE_MAP)) {
    const keyStripped = key.replace(/[\s\-_]+/g, '');
    if (stripped.includes(keyStripped) || keyStripped.includes(stripped)) {
      return path;
    }
  }

  // 4. Keyword Fallbacks
  if (stripped.includes('valley') || stripped.includes('green')) {
    return '/images/farms/green-valley.jpg';
  }
  if (stripped.includes('sun') || stripped.includes('rise')) {
    return '/images/farms/sunrise-farm.jpg';
  }
  if (stripped.includes('organ')) {
    return '/images/farms/organic-farm.jpg';
  }
  if (stripped.includes('natur')) {
    return '/images/farms/natural-farm.jpg';
  }
  if (stripped.includes('mount')) {
    return '/images/farms/mountain-farm.jpg';
  }
  if (stripped.includes('river')) {
    return '/images/farms/river-farm.jpg';
  }
  if (stripped.includes('gold') || stripped.includes('harvest')) {
    return '/images/farms/golden-harvest.jpg';
  }
  if (stripped.includes('eco')) {
    return '/images/farms/eco-farm.jpg';
  }

  return DEFAULT_FARM_IMAGE;
};

export { DEFAULT_FARM_IMAGE };
