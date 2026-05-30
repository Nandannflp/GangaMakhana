/**
 * Compress an image file using browser Canvas API.
 * @param {File} file - The image file to compress.
 * @param {number} maxSizeKB - The target max size in KB (e.g., 300).
 * @returns {Promise<File>} - Resolves with the compressed File.
 */
export async function compressImage(file, maxSizeKB = 300) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.match(/image.*/)) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if too large, max dimension 1024
        const maxDim = 1024;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height *= maxDim / width));
            width = maxDim;
          } else {
            width = Math.round((width *= maxDim / height));
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress loop
        let quality = 0.9;
        const compress = () => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Canvas to Blob failed"));
              return;
            }
            const sizeKB = blob.size / 1024;
            if (sizeKB <= maxSizeKB || quality <= 0.3) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              quality -= 0.1;
              compress();
            }
          }, file.type, quality);
        };
        compress();
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function compressImageAsBase64(file, maxSizeKB = 150) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.match(/image.*/)) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxDim = 800;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height *= maxDim / width));
            width = maxDim;
          } else {
            width = Math.round((width *= maxDim / height));
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.9;
        const compress = () => {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          // Base64 size estimation
          const sizeKB = (dataUrl.length * (3/4)) / 1024;
          
          if (sizeKB <= maxSizeKB || quality <= 0.2) {
            resolve(dataUrl);
          } else {
            quality -= 0.1;
            compress();
          }
        };
        compress();
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
