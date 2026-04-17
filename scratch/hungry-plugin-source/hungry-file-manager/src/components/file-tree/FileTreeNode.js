import React, { useState, useEffect } from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown, File } from 'lucide-react';
import useFileStore from '../../store/useFileStore';
import { api } from '../../services/api';
import { cn } from '../../lib/utils';

const FileIcon = ({ name, type }) => {
    if (type === 'd') return <Folder className="w-4 h-4 text-blue-400" />;

    const ext = name.split('.').pop();
    switch (ext) {
        case 'php': return <FileCode className="w-4 h-4 text-indigo-400" />;
        case 'js':
        case 'jsx': return <FileCode className="w-4 h-4 text-yellow-400" />;
        case 'css': return <FileCode className="w-4 h-4 text-blue-300" />;
        case 'json': return <FileCode className="w-4 h-4 text-green-400" />;
        default: return <File className="w-4 h-4 text-muted-foreground" />;
    }
};

const FileTreeNode = ({ item, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get store actions
    const { openFile, fetchFileContent, activeFile } = useFileStore();

    const isFolder = item.type === 'd';
    const isActive = activeFile?.path === item.path;

    const handleToggle = async (e) => {
        e.stopPropagation();
        if (!isFolder) {
            // It's a file: Open it!
            openFile(item);
            fetchFileContent(item.path);
            return;
        }

        // It's a folder: Toggle it
        setIsOpen(!isOpen);

        if (!isOpen && children.length === 0) {
            setIsLoading(true);
            try {
                const items = await api.getFiles(item.path);
                setChildren(items);
            } catch (error) {
                console.error("Failed to load folder", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="text-sm">
            <div
                className={cn(
                    "flex items-center py-1 pr-2 rounded-md cursor-pointer hover:bg-accent/50",
                    isActive && "bg-accent text-accent-foreground"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={handleToggle}
            >
                {isFolder && (
                    <span className="opacity-70 hover:opacity-100 shrink-0" onClick={handleToggle}>
                        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </span>
                )}
                {!isFolder && <span className="w-3 shrink-0" />} {/* spacer for alignment */}

                <span className="shrink-0">
                    <FileIcon name={item.name} type={item.type} />
                </span>
                <span className="truncate min-w-0 flex-1 opacity-90">{item.name}</span>
            </div >

            {isOpen && (
                <div>
                    {isLoading && <div className="pl-6 text-xs text-muted-foreground">Loading...</div>}
                    {!isLoading && children.map((child) => (
                        <FileTreeNode key={child.path} item={child} level={level + 1} />
                    ))}
                    {!isLoading && children.length === 0 && (
                        <div className="pl-6 text-xs text-muted-foreground italic">Empty</div>
                    )}
                </div>
            )}
        </div >
    );
};

export default FileTreeNode;
