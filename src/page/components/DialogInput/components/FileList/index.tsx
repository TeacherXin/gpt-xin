import { useState } from 'react';
import { useFilListStore, type FileItem } from './store';
import styles from './index.module.css';
import ExcelSvg from './assets/excel.svg?react'
import WordSvg from './assets/word.svg?react'
import TextSvg from './assets/text.svg?react'
import CloseSvg from './assets/close.svg?react'

interface FileListProps {
    fileList?: FileItem[];
}


const FileList: React.FunctionComponent<FileListProps> = (props) => {
    const fileList = useFilListStore((state) => state.fileList);
    const removeFile = useFilListStore((state) => state.removeFile);
    const [showCloseId, setShowCloseId] = useState<string>('');
    const getFileSvg = (fileType: string) => {
        if (fileType === 'application/vnd.ms-excel' || 
            fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return <ExcelSvg />;
        }
        if (fileType === 'application/msword' || 
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <WordSvg />;
        }
        if (fileType.startsWith('text/')) {
            return <TextSvg />;
        }
        return null;
    }
    const getFileTypeName = (fileType: string) => {
        if (fileType === 'application/vnd.ms-excel' || 
            fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return 'Excel文件';
        }
        if (fileType === 'application/msword' || 
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return 'Word文件';
        }
        if (fileType.startsWith('text/')) {
            return '文本文件';
        }
    }

    const removerFileItem = (uid: string) => () => {
        removeFile(uid);
    }
    return (
        <div className={styles.fileList}>
            {(props.fileList ? props.fileList : fileList).map((file) => (
                <div 
                    className={styles.fileItem}
                    key={file.name}
                    onMouseEnter={() => {
                        setShowCloseId(file.uid);
                    }}
                    onMouseLeave={() => {
                        setShowCloseId('');
                    }}
                >
                    <div className={styles.fileSvg}>
                        {getFileSvg(file.type)}
                    </div>
                    <div className={styles.fileContent}>
                        <p className={styles.title}>{file.name}</p>
                        <p className={styles.type}>{getFileTypeName(file.type)}</p>
                    </div>
                    {
                        showCloseId ===  file.uid && (
                        <CloseSvg
                            onClick={removerFileItem(file.uid)}
                            className={styles.closeSvg}
                        />
                    )}
                </div>
              ))}
        </div>
    );
};

export default FileList;
