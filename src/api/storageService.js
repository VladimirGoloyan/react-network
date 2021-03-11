class StorageService {
  setData = (key, data, storageType) => {
    const storage = storageType == "local" ? localStorage : sessionStorage;
    try {
      storage.setItem(key, JSON.stringify({ data }));
    } catch (err) {
      console.log("Error : " + err);
    }
  };
  remData = (key, storageType) => {
    const storage = storageType == "local" ? localStorage : sessionStorage;
    try {
      storage.removeItem(key);
    } catch (err) {
      console.log("Error : " + err);
    }
  };
}

const storeservice = new StorageService
export default storeservice
