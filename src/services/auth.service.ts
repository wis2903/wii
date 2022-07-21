import CryptoJS from 'crypto-js';
import { LocalStorageKeyEnum } from '../resources/constants/enum';
import config from '../config.json';
import StorageService from './storage.service';

class AuthService {
    private static inst?: AuthService;
    public user?: { username: string, hash: string, role?: string };

    public static get instance(): AuthService {
        if (!AuthService.inst) AuthService.inst = new AuthService();
        return AuthService.inst;
    }

    public requestSignInAsAdmin = async (username: string, password: string): Promise<{ username: string, hash: string, role?: string } | undefined> => {
        const user = config.users.find(item =>
            item.username === username
            && CryptoJS.HmacSHA1(password, config.passwordCryptoSecretkey).toString() === item.hash
        );
        if (user) this.user = user;
        return user;
    }

    public requestRestoreSession = async (username: string, hash: string): Promise<{ username: string, hash: string, role?: string } | undefined> => {
        const user = config.users.find(item =>
            item.username === username
            && item.hash === hash
        );
        if (user) this.user = user;
        return user;
    }

    public requestSignOutAsAdmin = async (): Promise<void> => {
        this.user = undefined;
        StorageService.instance.remove(LocalStorageKeyEnum.cachedAdminAccount);
    }
}

export default AuthService;