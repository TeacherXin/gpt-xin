import { create } from 'zustand';
import type { FileItem } from '../DialogInput/components/FileList/store';

interface DialogCard {
    question: string;
    answer: string;
    cardId: string;
    isPicture?: boolean;
    htmlUrl?: string; 
    fileList?: FileItem[];
}

interface DialogCardListStore {
    sessionId: string;
    setSessionId: (id: string) => void;
    dialogCardList: DialogCard[];
    addDialogCard: (card: DialogCard) => void;
    changeLastAnswer: (question: string) => void;
    changeLastId: (id: string) => void;
    changeLastHtmlUrl: (url: string) => void;
    clear: () => void;
}

export const useDialogCardListStore = create<DialogCardListStore>((set) => (
    {
        sessionId: '',
        setSessionId: (id: string) => set(() => ({ sessionId: id })),
        dialogCardList: [],
        addDialogCard: (card: DialogCard) => set((state) => ({
            dialogCardList: [...state.dialogCardList, card],
        })),
        changeLastAnswer: (answer: string) => set((state) => {
            const dialogCard = state.dialogCardList[state.dialogCardList.length - 1];
            if (dialogCard) {
                dialogCard.answer += answer;
            }
            return { dialogCardList: [...state.dialogCardList] };
        }),
        changeLastId: (id: string) => set((state) => {
            const dialogCard = state.dialogCardList[state.dialogCardList.length - 1];
            if (dialogCard) {
                dialogCard.cardId = id;
            }
            return { dialogCardList: [...state.dialogCardList] };
        }),
        changeLastHtmlUrl: (url: string) => set((state) => {
            const dialogCard = state.dialogCardList[state.dialogCardList.length - 1];
            if (dialogCard) {
                dialogCard.htmlUrl = url;
            }
            return { dialogCardList: [...state.dialogCardList] };
        }),
        clear: () => set(() => ({ dialogCardList: [], sessionId: '' })),
    }
));