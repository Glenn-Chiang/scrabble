const function_url = import.meta.env.VITE_FUNCTION_URL;

export async function validateWord(word: string): Promise<boolean> {
  const response = await fetch(
    function_url + "?" + new URLSearchParams({ word })
  );
  const data: { valid: boolean } = await response.json();

  return data.valid;
}
