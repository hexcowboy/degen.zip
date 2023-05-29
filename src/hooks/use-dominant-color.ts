import { useEffect, useState } from "react";

interface DominantColorResult {
  dominantColor: string | null;
  isLoading: boolean;
  error: string | null;
}

const useDominantColor = (imageUrl: string): DominantColorResult => {
  const [result, setResult] = useState<DominantColorResult>({
    dominantColor: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const getDominantColor = async () => {
      try {
        setResult((prevResult) => ({ ...prevResult, isLoading: true }));

        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = imageUrl;

        await new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = (e) => {
            console.log(e);
            throw new Error("Failed to load image");
          };
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas context is null");
        }

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        const colorCountMap = new Map<string, number>();

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const rgb = `rgb(${r},${g},${b})`;

          colorCountMap.set(rgb, (colorCountMap.get(rgb) || 0) + 1);
        }

        let maxCount = 0;
        let dominantColor: string | null = null;

        colorCountMap.forEach((count, color) => {
          if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
          }
        });

        setResult({ dominantColor, isLoading: false, error: null });
      } catch (error: any) {
        setResult((prevResult) => ({
          ...prevResult,
          isLoading: false,
          error: error.message || "Failed to get dominant color",
        }));
      }
    };

    getDominantColor();
  }, [imageUrl]);

  return result;
};

export default useDominantColor;
