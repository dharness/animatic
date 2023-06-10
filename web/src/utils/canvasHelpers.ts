export async function addImageToCanvas(
  canvas: HTMLCanvasElement,
  imgUrl: string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
  };
  img.onerror = (e) => {
    console.error("Failed to load image", e);
  };
  img.crossOrigin = "anonymous";
  //   img.src = imgUrl;
  img.src =
    "https://animatic-frames.s3.us-west-1.amazonaws.com/Red_Bunny_Petland_Puppy.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMSJHMEUCICl2sI9CB7R%2F7Ijd0%2BuM%2FEYUHeFf5oVr5MRkvt4T5Wv8AiEAzLlTVjhzznk%2BNlkPrGd6K1K99ausOHsRfGAYXwcGcGMq7QIImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARACGgwxNDU0MzE4NTEzNjEiDOrPCOUwe3EGedVYTyrBAkarP1Y68cRbtZzsPzivJ8ge9xyibUneoDGgQ4nzsYxOXtsoXfmBQ6K9xw1r2UDxiQ5BnpYmR63irOZpAb7GPqzEFJiImYdJh8fgMtqthjLuif34o0j1q2bRvbknnsxqrUb4ziOcJvGNnGwIa4F0CzM3WN7bZlY8tthdnE5bm0%2Bynyw1SjyIyJhcqXHVRj7pmEV1WrA1h7HhgvvuRE9J5NUSgglSxEOIP1NVk%2F1KjoIRf4Vb1gO9DJGawdwhr2tpVGcrS9pSJzDq4bFptkERDZenhbe1aN1%2F8GJvGmtR4Ua15OdsGPnscttzIoWM5xaeAjc9Zex75KzU8Pv23IC%2FgPTKQkA5Y5g7LbE8z6Ufj2xAeGk3IALAzbFKMg16R3lgokIkWWIVK1fHWdYUUynI8CUutnho1ZRpnKyBulqH60OyojCVnY%2BkBjqzAiYervtorbMVxDa1glrWp8kQ9mWSAd9V81GfY0cM8wqs2jKDDXHygNd%2B1XL3tyw7sVztQmVA7%2FuOFAydmSZrE2n1ILU%2FnJ6Uq6TopZxN8d6TWcMFqCd0qA8TdayCDLmBaFq9J2cMzr73TvXllfDUiVlSJphwQM0bdiRtlWrGEnEjGOB38J8%2BS26GaL8EMr1z03b2hhLYZH3AqfZKyimfVytXLX4Qzm5CKl8T5FyErAJpxU%2Bi33mU5ZaQLJVv49%2B1FYYzXrngts5kvCiR5erDw6vywjbQHoIIVsa93SEyD2%2F8i0U885VTXzL5YGIiH6wKjARpMfriH75s0ZfiouC%2Fv0CUdPZxXKRWbPiJuqe0Ys11EKOd9F03Y8iEc8sNMS8O5PIZE4MTrkj6Oh01RZ4gp9G3G0s%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230610T011545Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIASDXDJ6FQ5B374BB6%2F20230610%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=2dec8d0c6773c26e5a93ed44ea201325b66a87af9622c42aae8a18a22f762e80";
  console.log(img);
}
