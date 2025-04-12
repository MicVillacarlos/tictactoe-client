export const addApostrophe = (name: string): string => {
  if (!name) return "";

  const trimmedName = name.trim();
  const lastChar = trimmedName.charAt(trimmedName.length - 1).toLowerCase();

  return lastChar === "s" ? `${trimmedName}'` : `${trimmedName}'s`;
}