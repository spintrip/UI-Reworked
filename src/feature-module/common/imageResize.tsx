export const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
  
      img.onload = () => {
        let width = img.width;
        let height = img.height;

  
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight / height));
            height = maxHeight;
          }
        }

  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
  
        ctx?.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          if (blob) {

            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error("Image resizing failed."));
          }
        }, file.type), 0.9
      };
  
      reader.readAsDataURL(file);
    });
  };
  