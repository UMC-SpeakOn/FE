export const getOrCreateViewUUID = (key: string) => {
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const uuid = crypto.randomUUID();
  sessionStorage.setItem(key, uuid);
  return uuid;
};
