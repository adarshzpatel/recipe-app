import { STORAGE_BUCKET_ID, storage } from "../../appwrite/client"

export const getFilePreview =  (fileId:string) => {
  return storage.getFilePreview(STORAGE_BUCKET_ID,fileId)
}