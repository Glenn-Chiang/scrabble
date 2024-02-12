const BASE_URL = import.meta.env.VITE_API_URL;

export async function validateWord(word: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/valid-words/${word}`);
  const data: { valid: boolean } = await response.json();
  return data.valid;
}
