import { Account, Client, ID } from "appwrite";
import conf from "../config/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login(email, password)
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() { 
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Not able to fetch user ::", error);
            
        }
    }
    async logout() { 
        try {

            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Not able to logout ::",error)
            alert("Not able to Logout")
        }
    }
}




const authService = new AuthService()

export default authService