// src/utils/ocrService.js
export const extractTextFromImage = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // ✅ fixed index

      try {
        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`, // ✅ fixed env var
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              requests: [
                {
                  image: { content: base64Image },
                  features: [{ type: 'TEXT_DETECTION' }],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const text = data.responses?.[0]?.fullTextAnnotation?.text || '';
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};
