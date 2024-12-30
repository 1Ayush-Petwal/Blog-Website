// To make the authentication service for the users 
import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'


// Since JS is not a strongly typed language therefore we can use the objects without settting its data type
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        console.log("Appwrite client is set with : ", conf.appwriteUrl, conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            // New account creation using the account object function 
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            //Checking is the userAccount was created Successfully 
            if (userAccount) {
                // Call the login method 
            } else {
                return userAccount;
            }
        }
        catch (error) {
            console.log("Appwrite error is in Creating the User: ", error); //Logging the error in the console
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite error is in Logging in the User: ", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error is in Getting the User: ", error);
        }
        return null;
    }

    async logout() {
        try {
            console.log("Logging out the user");
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite error is in Logging out the User: ", error);
            null;
        }
    }
}

const authService = new AuthService();

// Providing the object of the service to be provided
export default authService;