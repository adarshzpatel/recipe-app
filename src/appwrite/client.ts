import { Client, Account, Storage, Databases } from "appwrite";

const API_ENDPOINT = "https://cloud.appwrite.io/v1"
const PROJECT_ID = "646305d29ac04526d6db"
export const STORAGE_BUCKET_ID = "6466a9308fcccd326930"
export const DATABASE_ID = "6466a59081c5386778f5"
export const RECIPE_COLLECTION_ID = "6466a5bac373814fc38f"
export const USER_COLLECTION_ID = "6471ee2cc65650bae83f"


const appwriteClient = new Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(appwriteClient);
export const storage = new Storage(appwriteClient);
export const database = new Databases(appwriteClient)

export default appwriteClient
