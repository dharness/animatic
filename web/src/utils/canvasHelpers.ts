export async function addImageToCanvas(
  canvas: HTMLCanvasElement,
  imgData: string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.onerror = (event) => {
    console.error("Failed to load image", event);
    // Access additional error information
  };
  if (!imgData) return;
  img.src = `data:image/png;base64,${imgData}`;
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
