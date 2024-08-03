import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../config/conf";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Bucket(this.client)
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug)
        } catch (error) {
           alert("Document Not found.") 
           console.log("Error finding document :: ",error )
           return false
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries)
        } catch (error) {
            alert("Posts Not found.") 
           console.log("Error finding posts :: ",error )
           return false
        }
    }

    async createPost({title, slug, content, status, featuredImage, userId}){
        try {
            return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status, userId
            })
        } catch (error) {
            alert("Not able to create Post")
            console.log("Not able to createPost :: ", error)
        }
    }

    async updatePost(slug, {title, content,featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId,slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            alert("ERROR :: Updating Post")
            console.log("Not able to update post ::", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId, conf.appWriteCollectionId, slug
            ); return true;
        } catch (error) {
            alert("ERROR :: Not able to delete the post")
            console.log("Not able to delete post ", error)
            return false
        }
    }


    // Storage SErvice
    async uploadFile({file}) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            alert("ERROR: Uploading file error");
            console.log("Not able to upload file :: ",error )
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            alert("ERROR :: Failed to delete file.")
            console.log("Failed to delete file :: ")
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId, fileId
        ).href
    }

}

const service = new Service()
export default service
