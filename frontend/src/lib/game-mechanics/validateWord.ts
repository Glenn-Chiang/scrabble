export async function validateWord(word: string) {
  const response = await fetch('/words.json')
  const wordsData = await response.json()
  return wordsData[word] === 1
}