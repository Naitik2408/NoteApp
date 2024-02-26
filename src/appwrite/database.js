import { Client, Databases, ID } from "appwrite";
import conf from "../conf";

export class Service{
    client = new Client();
    databases;
    constructor(){
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.project_id);
        this.databases = new Databases(this.client);
    }

    async createPost({NoteTitle, Note, CreatedOn, userId}){
        try {
            return await this.databases.createDocument(
                conf.database_id,
                conf.collection_id,
                ID.unique(),
                {
                    NoteTitle, 
                    Note, 
                    CreatedOn, 
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }



    async allPosts(){
        try {
            return await this.databases.listDocuments(conf.database_id, conf.collection_id);
        } catch (error) {
            console.log('this is error: ', error);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.database_id,conf.collection_id,slug);
        } catch (error) {
            console.log('this is getpost error: ', error)
        }
    }
}

const service = new Service()

export default service;