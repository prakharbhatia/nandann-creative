import React, { useEffect } from 'react';
import { api } from '../../services/api';
import FileTreeNode from './FileTreeNode';
import useFileStore from '../../store/useFileStore';

const FileTree = () => {
    const { currentPath, files, startPath, setPath, fetchFiles, isLoading, openFile } = useFileStore();

    // Initial load
    useEffect(() => {
        fetchFiles(startPath || '');
    }, [startPath, fetchFiles]);

    if (isLoading) return <div className="p-4 text-xs text-muted-foreground">Loading file system...</div>;

    return (
        <div className="py-2">
            {files.map((item) => (
                <FileTreeNode key={item.path} item={item} />
            ))}
        </div>
    );
};

export default FileTree;
