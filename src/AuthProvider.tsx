import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { getUser } from './utils/api';

type User = null | { userid: number; role: string };

export const AuthContext = React.createContext<{
    user: User;
    login: () => void;
    logout: () => void;
}>({
    user: null,
    login: () => { },
    logout: () => { }
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User>(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                login: async () => {
                    const user = await getUser();
                    setUser(user);
                },
                logout: () => {
                    setUser(null);
                    AsyncStorage.removeItem('user');
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};