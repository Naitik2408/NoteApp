import {Client, Account, ID} from "appwrite";
import conf from "../conf";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_url)
        .setProject(conf.project_id);
    this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                console.log("loged in sucessfully")
                return this.login({email, password});
            }else{
                console.log("faild to loged in")
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            const  response = await this.account.deleteSessions();
            console.log("logged out sucessfully",response);
        } catch (error) {
            console.log("this is logout error:",error)
        }
    }

    async verifyUser(){
        try {
            const response = await this.account.createVerification('localhost:5173/signUp');
            if(response){
                console.log(response);
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const authService = new AuthService();
export default authService;