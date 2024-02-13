import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const bucketName = "scrabble-words";
const fileName = "words_dictionary.json";

export const handler = async function (event) {
  const word = event.queryStringParameters.word;

  await getFileFromS3(bucketName, fileName)
  
  const words = JSON.parse(wordsString);
  const wordIsValid = words[word.toLowerCase()] === 1;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      valid: wordIsValid,
    }),
    isBase64Encoded: false,
  };
};


async function getFileFromS3(bucketName, fileName) {
  const client = new S3Client({});

  const { Body } = await client.send(
    new GetObjectCommand({ Bucket: bucketName, Key: fileName })
  );

  const fileData = await Body.transformToString();
  return fileData
}
