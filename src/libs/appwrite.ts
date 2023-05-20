import { Client, Account } from "appwrite";

const API_ENDPOINT = "https://cloud.appwrite.io/v1"
const PROJECT_ID = "646305d29ac04526d6db"

const appwriteClient = new Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(appwriteClient);

export default appwriteClient
