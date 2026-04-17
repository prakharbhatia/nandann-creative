import { create } from 'zustand';
import { api } from '../services/api';

const useFileStore = create((set, get) => ({
    currentPath: '',
    files: [], // Directory listing
    folders: [],

    // Tab Management
    openFiles: [], // Array of { path, name, language, content, isDirty }
    activeFile: null, // The currently viewed file object (or null)

    isLoading: false,

    // Actions
    setPath: (path) => set({ currentPath: path }),
    setFiles: (items) => set({ files: items }),
    setLoading: (loading) => set({ isLoading: loading }),

    // Open a file (Add to tabs if not exists, set as active)
    openFile: (file) => {
        const { openFiles } = get();
        const existing = openFiles.find(f => f.path === file.path);

        if (existing) {
            set({ activeFile: existing });
        } else {
            // Add new file to tabs
            const newFile = { ...file, content: file.content || '' };
            set({
                openFiles: [...openFiles, newFile],
                activeFile: newFile
            });
        }
    },

    // Set active tab (switching tabs)
    setActiveFile: (file) => set({ activeFile: file }),

    // Fetch file content (and update the tab if it exists)
    fetchFileContent: async (path) => {
        set({ isLoading: true });
        try {
            const response = await api.getFileContent(path);
            // Destructure content but keep other props (is_image, etc)
            const { content, ...meta } = response;

            set(state => {
                // Update the file in openFiles if it's there
                const updatedFiles = state.openFiles.map(f =>
                    f.path === path ? { ...f, content, ...meta, isDirty: false, error: null } : f
                );

                // Update activeFile if it matches
                const updatedActive = state.activeFile?.path === path
                    ? { ...state.activeFile, content, ...meta, isDirty: false, error: null }
                    : state.activeFile;

                return {
                    openFiles: updatedFiles,
                    activeFile: updatedActive,
                    isLoading: false
                };
            });
        } catch (error) {
            console.error('Failed to fetch file content:', error);
            // Update state with error
            set(state => {
                const errorMsg = error.message || 'Failed to load content';
                return {
                    openFiles: state.openFiles.map(f => f.path === path ? { ...f, error: errorMsg } : f),
                    activeFile: state.activeFile?.path === path ? { ...state.activeFile, error: errorMsg } : state.activeFile,
                    isLoading: false
                };
            });
        }
    },

    // Update content of a file (user typing) - marks as dirty
    updateFileContent: (path, content) => {
        set(state => ({
            openFiles: state.openFiles.map(f =>
                f.path === path ? { ...f, content, isDirty: true } : f
            ),
            // Update activeFile ref if it's the one changing
            activeFile: state.activeFile?.path === path
                ? { ...state.activeFile, content, isDirty: true }
                : state.activeFile
        }));
    },

    // Close a tab
    closeFile: (path) => {
        const { openFiles, activeFile } = get();
        const newFiles = openFiles.filter(f => f.path !== path);

        // Determine new active file if we closed the active one
        let newActive = activeFile;
        if (activeFile?.path === path) {
            // If we closed the active file, switch to the last one (like VS Code behavior-ish)
            newActive = newFiles.length > 0 ? newFiles[newFiles.length - 1] : null;
        }

        set({
            openFiles: newFiles,
            activeFile: newActive
        });
    },

    // Legacy support / Adapter for existing components calling fetchFiles
    fetchFiles: async (path = '') => {
        set({ isLoading: true });
        try {
            const files = await api.getFiles(path);
            set({ files, currentPath: path, isLoading: false });
            return files;
        } catch (error) {
            console.error('Failed to fetch files:', error);
            set({ isLoading: false });
        }
    },

    createDirectory: async (name) => {
        const path = get().currentPath;
        try {
            await api.createDirectory(path, name);
            // Refresh
            get().fetchFiles(path);
            return true;
        } catch (error) {
            return false;
        }
    }
}));

export default useFileStore;
