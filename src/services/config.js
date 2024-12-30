import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf/conf.js'

export class Service {
    client = new Client();
    databases;
    storages;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storages = new Storage(this.client);
    }

    //slug is nothing our alternative for documentID 
    async createPost({userId, title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite error is in Creating the Post: ", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite error is in Updating the Post: ", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite error is in Deleting the Post: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite error is in Getting the Post: ", error);
            return false;
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite error is in Getting the Posts: ", error);
            return null;
        }
    }

    //file format: document.getElementById('uploader').files[0]
    async uploadFile(file) {
        try {
            console.log(" Bucket id is: ", conf.appwriteBucketId);
            return await this.storages.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite error is in Uploading the File: ", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storages.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log("Appwrite error is in Deleting the File: ", error);
            return false;
        }
    }

    getFilePreview(fileID) {
        return this.storages.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const service = new Service();

export default service;
