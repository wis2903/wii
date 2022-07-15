import CryptoJS from 'crypto-js';
import { LocalStorageKeyEnum } from '../resources/constants/enum';
import { adminUsers, passwordCryptoSecretkey } from '../resources/constants/users';
import StorageService from './storage.service';

class AuthService {
    private static inst?: AuthService;
    public isSignedInAsAdmin?: boolean;
    public signedInUsername?: string;

    public static get instance(): AuthService {
        if (!AuthService.inst) AuthService.inst = new AuthService();
        return AuthService.inst;
    }

    public requestSignInAsAdmin = async (username: string, password: string): Promise<{ username: string, hash: string } | undefined> => {
        const user = adminUsers.find(item =>
            item.username === username
            && CryptoJS.HmacSHA1(password, passwordCryptoSecretkey).toString() === item.hash
        );
        if (user) {
            this.isSignedInAsAdmin = true;
            this.signedInUsername = user.username;
        }
        return user;
    }

    public requestRestoreSession = async (username: string, hash: string): Promise<{ username: string, hash: string } | undefined> => {
        const user = adminUsers.find(item =>
            item.username === username
            && item.hash === hash
        );
        if (user) {
            this.isSignedInAsAdmin = true;
            this.signedInUsername = user.username;
        }
        return user;
    }

    public requestSignOutAsAdmin = async (): Promise<void> => {
        this.isSignedInAsAdmin = false;
        this.signedInUsername = undefined;
        StorageService.instance.remove(LocalStorageKeyEnum.cachedAdminAccount);
    }
}

export default AuthService;