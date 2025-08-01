import { create } from 'zustand';

export type FileItem = File & {
    uid: string;
};

interface FileListStore {
    fileList: FileItem[];
    setFileList: (fileList: FileItem[]) => void;
    clearFileList: () => void;
    removeFile: (fileId: string) => void;
}

export const useFilListStore = create<FileListStore>((set) => ({
    fileList: [],
    setFileList: (fileList) => set(() => ({ fileList })),
    clearFileList: () => set(() => ({ fileList: [] })),
    removeFile: (fileId) => set((state) => {
        return {
            fileList: state.fileList.filter(f => f['uid' as keyof File] !== fileId),
        }
    }),
}));