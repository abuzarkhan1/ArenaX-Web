// Simple HSL to Hex converter
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// OKLCH to RGB converter
function oklchToRgb(l, c, h) {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const L = l_ * l_ * l_;
  const M = m_ * m_ * m_;
  const S = s_ * s_ * s_;

  let r = +4.0767434099 * L - 3.3077115913 * M + 0.2309699292 * S;
  let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  let bl = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S;

  const gamma = val => {
    const clamped = Math.max(0, Math.min(1, val));
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const R = Math.round(gamma(r) * 255);
  const G = Math.round(gamma(g) * 255);
  const B = Math.round(gamma(bl) * 255);

  const toHex = n => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
}

console.log('--- Brand Greens ---');
console.log('Brand default (153.1deg, 60.2%, 52.7%):', hslToHex(153.1, 60.2, 52.7));
console.log('Brand 600 (154.9deg, 59.5%, 70%):', hslToHex(154.9, 59.5, 70));
console.log('Brand 500 (154.9deg, 100%, 19.2%):', hslToHex(154.9, 100, 19.2));
console.log('Brand 400 (155.5deg, 100%, 9.6%):', hslToHex(155.5, 100, 9.6));
console.log('Brand 300 (155.1deg, 100%, 8%):', hslToHex(155.1, 100, 8));
console.log('Brand 200 (162deg, 100%, 2%):', hslToHex(162, 100, 2));

console.log('\n--- Dark Theme Carbon Surfaces (OKLCH computed) ---');
console.log('Background (--surface: 0.19, c: 0.0025, h: 157.5):', oklchToRgb(0.19, 0.0025, 157.5));
console.log('Card / Surface-75 / Surface-100 (l: 0.19 + 0.025 = 0.215):', oklchToRgb(0.215, 0.0025, 157.5));
console.log('Popover (l: 0.19 + 0.025*1.5 = 0.2275):', oklchToRgb(0.2275, 0.0025, 157.5));
console.log('Secondary / Surface-300 (l: 0.19 + 0.025*2 = 0.24):', oklchToRgb(0.24, 0.0025, 157.5));

console.log('\n--- Alternative / Root palette values ---');
// Let's check colors-gray-dark values
console.log('gray-dark-100 (0deg 0% 8.6%):', hslToHex(0, 0, 8.6));
console.log('gray-dark-200 (0deg 0% 11%):', hslToHex(0, 0, 11));
console.log('gray-dark-300 (0deg 0% 13.7%):', hslToHex(0, 0, 13.7));
console.log('gray-dark-400 (0deg 0% 15.7%):', hslToHex(0, 0, 15.7));
console.log('gray-dark-500 (0deg 0% 18%):', hslToHex(0, 0, 18));
console.log('gray-dark-600 (0deg 0% 20.4%):', hslToHex(0, 0, 20.4));
console.log('gray-dark-700 (0deg 0% 24.3%):', hslToHex(0, 0, 24.3));
console.log('gray-dark-800 (0deg 0% 31.4%):', hslToHex(0, 0, 31.4));
console.log('gray-dark-900 (0deg 0% 43.9%):', hslToHex(0, 0, 43.9));
console.log('gray-dark-1000 (0deg 0% 49.4%):', hslToHex(0, 0, 49.4));
console.log('gray-dark-1100 (0deg 0% 62.7%):', hslToHex(0, 0, 62.7));
console.log('gray-dark-1200 (0deg 0% 92.9%):', hslToHex(0, 0, 92.9));

console.log('\n--- Slate dark values ---');
console.log('slate-dark-100 (200deg 6.7% 8.8%):', hslToHex(200, 6.7, 8.8));
console.log('slate-dark-200 (195deg 7.1% 11%):', hslToHex(195, 7.1, 11));
console.log('slate-dark-300 (192deg 7.2% 13.5%):', hslToHex(192, 7.2, 13.5));
console.log('slate-dark-400 (204deg 6.2% 15.9%):', hslToHex(204, 6.2, 15.9));
console.log('slate-dark-500 (200deg 6.5% 18%):', hslToHex(200, 6.5, 18));
console.log('slate-dark-600 (205.7deg 6.7% 20.6%):', hslToHex(205.7, 6.7, 20.6));
console.log('slate-dark-700 (202.5deg 6.5% 24.3%):', hslToHex(202.5, 6.5, 24.3));
console.log('slate-dark-800 (206.7deg 5.6% 31.6%):', hslToHex(206.7, 5.6, 31.6));
console.log('slate-dark-900 (205.7deg 6.3% 43.9%):', hslToHex(205.7, 6.3, 43.9));
console.log('slate-dark-1000 (207.7deg 5.1% 49.6%):', hslToHex(207.7, 5.1, 49.6));
console.log('slate-dark-1100 (207.3deg 5.8% 62.9%):', hslToHex(207.3, 5.8, 62.9));
console.log('slate-dark-1200 (210deg 5.6% 92.9%):', hslToHex(210, 5.6, 92.9));
