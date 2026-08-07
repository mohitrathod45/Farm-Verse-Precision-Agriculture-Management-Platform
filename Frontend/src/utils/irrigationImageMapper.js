/**
 * Utility helper to map irrigation types to REALISTIC DSLR PHOTOGRAPHY in public/images/irrigation/
 * 
 * - Drip Irrigation: Close-up DSLR photograph of black drip irrigation pipes & water drops on soil/plants
 * - Sprinkler Irrigation: Realistic DSLR photograph of sprinklers actively spraying water mist over green crops
 * - Flood Irrigation: Realistic DSLR photograph of water flowing through agricultural furrows between crops
 * - Surface Irrigation: Surface water flow photography
 */

const DEFAULT_IRRIGATION_IMAGE = '/images/irrigation/default-irrigation.jpg';

const IRRIGATION_IMAGE_MAP = {
  // Drip Irrigation
  'drip irrigation': '/images/irrigation/drip.jpg',
  drip: '/images/irrigation/drip.jpg',
  subsurface: '/images/irrigation/drip.jpg',
  micro: '/images/irrigation/drip.jpg',

  // Sprinkler Irrigation
  sprinkler: '/images/irrigation/sprinkler.jpg',
  'sprinkler irrigation': '/images/irrigation/sprinkler.jpg',
  pivot: '/images/irrigation/sprinkler.jpg',
  'center pivot': '/images/irrigation/sprinkler.jpg',
  overhead: '/images/irrigation/sprinkler.jpg',

  // Flood Irrigation
  'flood irrigation': '/images/irrigation/flood.jpg',
  flood: '/images/irrigation/flood.jpg',

  // Surface Irrigation
  'surface irrigation': '/images/irrigation/surface.jpg',
  surface: '/images/irrigation/surface.jpg',
  furrow: '/images/irrigation/surface.jpg',
  basin: '/images/irrigation/surface.jpg',
};

/**
 * Returns the corresponding image URL for a given irrigation type.
 * Falls back to DEFAULT_IRRIGATION_IMAGE if no match is found.
 * 
 * @param {string} irrigationType 
 * @returns {string} Image path
 */
export const getIrrigationImage = (irrigationType) => {
  if (!irrigationType || typeof irrigationType !== 'string') {
    return DEFAULT_IRRIGATION_IMAGE;
  }

  const rawLower = irrigationType.trim().toLowerCase();
  const stripped = rawLower.replace(/[\s\-_]+/g, '');

  // 1. Direct key match on raw lowercase string
  if (IRRIGATION_IMAGE_MAP[rawLower]) {
    return IRRIGATION_IMAGE_MAP[rawLower];
  }

  // 2. Direct key match on stripped string
  if (IRRIGATION_IMAGE_MAP[stripped]) {
    return IRRIGATION_IMAGE_MAP[stripped];
  }

  // 3. Partial key match
  for (const [key, path] of Object.entries(IRRIGATION_IMAGE_MAP)) {
    const keyStripped = key.replace(/[\s\-_]+/g, '');
    if (stripped.includes(keyStripped) || keyStripped.includes(stripped)) {
      return path;
    }
  }

  // 4. Keyword Fallbacks
  if (stripped.includes('drip') || stripped.includes('micro')) {
    return '/images/irrigation/drip.jpg';
  }
  if (stripped.includes('sprink') || stripped.includes('pivot') || stripped.includes('spray')) {
    return '/images/irrigation/sprinkler.jpg';
  }
  if (stripped.includes('flood')) {
    return '/images/irrigation/flood.jpg';
  }
  if (stripped.includes('surface') || stripped.includes('furrow') || stripped.includes('basin')) {
    return '/images/irrigation/surface.jpg';
  }

  return DEFAULT_IRRIGATION_IMAGE;
};

export { DEFAULT_IRRIGATION_IMAGE };
