import CryptoJS from 'crypto-js';
import { adminUsers, passwordCryptoSecretkey } from '../resources/constants/users';

class AuthService {
    private static inst?: AuthService;
    public isSignedInAsAdmin?: boolean;
    public signedInUsername?: string;

    public static get instance(): AuthService {
        if (!AuthService.inst) AuthService.inst = new AuthService();
        return AuthService.inst;
    }

    public requestSignInAsAdmin = async (username: string, password: string): Promise<boolean> => {
        const user = adminUsers.find(item =>
            item.username === username
            && CryptoJS.HmacSHA1(password, passwordCryptoSecretkey).toString() === item.hash
        );
        this.isSignedInAsAdmin = true;
        this.signedInUsername = user?.username;
        return !!user;
    }

    public requestSignOutAsAdmin = async (): Promise<void> => {
        this.isSignedInAsAdmin = false;
    }
}

export default AuthService;