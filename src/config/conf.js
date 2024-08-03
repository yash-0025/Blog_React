const conf = {
    appWriteUrl: String(process.env.BLOG_APP_APPWRITE_URL),
    appWriteProjectId: String(process.env.BLOG_APP_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(process.env.BLOG_APP_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(process.env.BLOG_APP_APPWRITE_COLLECTION_ID),
    appWriteBucketId: String(process.env.BLOG_APP_APPWRITE_BUCKET_ID)
} 


export default conf