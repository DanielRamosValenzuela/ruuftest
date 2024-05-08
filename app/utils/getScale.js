export const getScale = (width, height) => {
  const maxWidth = 800;
  const maxHeight = 600;
  return Math.min(maxWidth / width, maxHeight / height);
};