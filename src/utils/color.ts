function hexToRgb(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);

  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function isLight(hex: string) {
  return luminance(hex) > 0.179;
}

export const colors = [
  '#E57373', // Light Red
  '#F06292', // Light Pink
  '#BA68C8', // Light Purple
  '#9575CD', // Light Deep Purple
  '#64B5F6', // Light Blue
  '#4FC3F7', // Light Sky Blue
  '#4DD0E1', // Light Cyan
  '#4DB6AC', // Light Teal
  '#81C784', // Light Green
  '#AED581', // Light Lime Green
  '#FFD54F', // Light Yellow
  '#FFB74D', // Light Orange,
  '#9e9e9e', // Light Grey,
  '#595959', // Dark Grey,
  '#000000' // Black,
];
