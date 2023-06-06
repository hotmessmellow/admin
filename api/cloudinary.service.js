import axios from 'axios';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqzpz4w3l/image/upload";

class CloudinaryService {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "coindraw");
    const { data } = await axios.post(CLOUDINARY_URL, formData);
    return data;
  }
}

export default new CloudinaryService();
