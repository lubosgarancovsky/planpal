export const baseUrl = () => {
  const prefix = import.meta.env.VITE_PROJECT_API_PREFIX;
  const secret = import.meta.env.VITE_PROJECT_SECRET;

  return `https://${secret}.mockapi.io${prefix}`;
};
