import httpCommon from "./http-common";

class StorageService {
  upload(data) {
    return httpCommon.post("/ipfs/upload", { metadata: data });
  }

  resolve(hash) {
    return httpCommon.get(`/ipfs/resolve/${hash}`);
  }
}

export default new StorageService();
