// General Norm of getting the env variables 
// Better than Directly using the env variables form .env 

// TypdeCasting just in case the type of the env variable returned is different
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPRWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPRWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPRWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPRWRITE_BUCKET_ID),
}

export default conf;