export const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.floor(Math.random() * 16);
  const v = c === 'x' ? r : Math.floor((r % 3) + 8);
  return v.toString(16);
});
