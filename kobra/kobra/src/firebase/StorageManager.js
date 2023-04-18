import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { FirebaseStorage } from "./firebaseConfig"; // Replace with your Firebase configuration import
import { loadImage, createImageBitmap, ImageBitmapRenderingContext } from "canvas"; // Required to use canvas in Node.js

class StorageManager {
  constructor() {
    this.storage = FirebaseStorage;
    this.reference = ref(this.storage);
  }

  async upload(imageSrc) {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement("canvas");
    const resizedImage = this.aspectFittedToHeight(image, 200);
    canvas.width = resizedImage.width;
    canvas.height = resizedImage.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(resizedImage, 0, 0, resizedImage.width, resizedImage.height);
    const data = canvas.toDataURL("image/jpeg", 0.2);
    const storageRef = ref(this.storage, "images/image.jpg");
    await uploadBytes(storageRef, data);
  }

  async downloadImage(reference, completion) {
    try {
      const url = await getDownloadURL(reference);
      const response = await fetch(url);
      const blob = await response.blob();
      const image = await createImageBitmap(blob);
      completion(image);
    } catch (error) {
      console.error("Error downloading image:", error);
      completion(null);
    }
  }

  async listAllFiles(completion) {
    try {
      const storageRef = ref(this.storage);
      const result = await listAll(storageRef);
      completion(result.items);
    } catch (error) {
      console.error("Error while listing all files:", error);
      completion([]);
    }
  }

  async deleteItem(item) {
    try {
      await deleteObject(item);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  }

  aspectFittedToHeight(image, newHeight) {
    const newWidth = (image.width / image.height) * newHeight;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    const resizedImageSrc = canvas.toDataURL("image/jpeg", 0.2);
    return new Image(resizedImageSrc);
  }
}

export default StorageManager;
