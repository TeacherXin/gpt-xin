import { create } from 'zustand';

interface DialogInputStore {
    inputValue: string;
    setInputValue: (value: string) => void;
    inputLoading: boolean;
    setInputLoading: (value: boolean) => void;
}

export const useDialogInputStore = create<DialogInputStore>((set) => ({
    inputValue: '',
    inputLoading: false,
    setInputValue: (value: string) => set({ inputValue: value }),
    setInputLoading: (value: boolean) => set({ inputLoading: value }),
}));