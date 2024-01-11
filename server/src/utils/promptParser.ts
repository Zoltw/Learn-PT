export const parseJsonArray = (text: string | null) => {
  const regex = /\[\s*\{.*?\}\s*\]/gs;
  const match = regex.exec(text!);

  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  return null;
};
