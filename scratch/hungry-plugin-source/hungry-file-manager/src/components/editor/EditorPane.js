import React from 'react';
import Editor from '@monaco-editor/react';
import useFileStore from '../../store/useFileStore';
import { useTheme } from 'next-themes';
import { Save, Loader2, X } from 'lucide-react';
import { api } from '../../services/api';
import { cn } from '../../lib/utils';

const EditorPane = () => {
    const { activeFile, openFiles, setActiveFile, closeFile, updateFileContent, isLoading } = useFileStore();
    const { theme } = useTheme();
    const [isSaving, setIsSaving] = React.useState(false);

    // Sync content when active file changes
    React.useEffect(() => {
        // If we have an active file, ensure the editor shows its content
        // Note: In a real multi-tab Monaco setup, we might manage models. 
        // For simplicity, we just rely on the store's content for the active file.
    }, [activeFile]);

    const handleSave = async () => {
        if (!activeFile) return;
        setIsSaving(true);
        try {
            await api.updateFileContent(activeFile.path, activeFile.content);
            // Optionally mark clean in store
            useFileStore.getState().fetchFileContent(activeFile.path);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    // Editor onChange: Update store immediately (marking dirty)
    const handleEditorChange = (value) => {
        if (activeFile) {
            updateFileContent(activeFile.path, value);
        }
    };

    if (!activeFile && openFiles.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-card">
                <div className="text-4xl mb-4 opacity-20">👋</div>
                <p>Select a file to start editing</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-card">
            {/* Tab Bar */}
            <div className="flex items-center bg-muted/20 border-b border-border overflow-x-auto no-scrollbar">
                {openFiles.map((file) => (
                    <div
                        key={file.path}
                        className={cn(
                            "group flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] border-r border-border cursor-pointer select-none text-xs transition-colors",
                            activeFile?.path === file.path ? "bg-background text-foreground font-medium border-t-2 border-t-primary" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setActiveFile(file)}
                    >
                        <span className="truncate flex-1">{file.name || file.path.split('/').pop()}</span>
                        {/* Dirty Indicator / Close Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeFile(file.path);
                            }}
                            className={`p-0.5 hover:bg-muted-foreground/20 rounded ${file.isDirty ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        >
                            {file.isDirty ? (
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            ) : (
                                <span className="text-[10px] leading-none block">✕</span>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Toolbar (Active File Actions) */}
            {
                activeFile && (
                    <div className="flex items-center justify-between border-b border-border bg-card px-2 py-1">
                        <div className="text-xs text-muted-foreground truncate px-2">
                            {activeFile.path}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                                {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                Save
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 z-10">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                ) : null}

                {activeFile && activeFile.error ? (
                    <div className="h-full flex flex-col items-center justify-center text-destructive p-8 text-center bg-destructive/5 select-text">
                        <div className="font-bold text-lg mb-2 flex items-center gap-2">
                            <span>⚠️</span> Error Loading File
                        </div>
                        <p className="bg-white p-4 rounded border border-destructive/20 font-mono text-xs max-w-2xl break-all shadow-sm text-left">
                            {activeFile.error}
                        </p>
                        <p className="mt-4 text-xs text-muted-foreground">Please share this error with the developer.</p>
                    </div>
                ) : activeFile && activeFile.is_image ? (
                    <div className="h-full flex flex-col items-center justify-center bg-muted/10 p-4">
                        <div className="bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2NkYGD4z8DAwMgwKgAOA4wKQA6Aw8CgAQA6YwYF7wrOagAAAABJRU5ErkJggg==')] border border-border rounded-md shadow-sm overflow-hidden flex items-center justify-center max-h-full max-w-full">
                            <img
                                src={activeFile.content}
                                alt={activeFile.name}
                                className="max-h-[80vh] max-w-full object-contain"
                            />
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground font-mono">
                            {activeFile.name}
                        </div>
                    </div>
                ) : activeFile && (
                    <Editor
                        height="100%"
                        path={activeFile.path} // Important: Tells Monaco this is a distinct file model
                        defaultLanguage={activeFile.language || 'php'}
                        language={activeFile.language || 'php'}
                        value={activeFile.content} // Controlled by store
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: true },
                            fontSize: 14,
                            fontFamily: 'JetBrains Mono, monospace',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            wordWrap: 'on',
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default EditorPane;
