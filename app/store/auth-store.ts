import { create } from 'zustand';
import { auth } from '@/app/lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';

interface AuthStore {
    user: User | null;
    loading: boolean;
    error: string | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,
    error: null,

    signUp: async (email, password) => {
        try {
            set({ loading: true, error: null });
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    signIn: async (email, password) => {
        try {
            set({ loading: true, error: null });
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    signOut: async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            set({ error: (error as Error).message });
        }
    },
}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({ user, loading: false });
});