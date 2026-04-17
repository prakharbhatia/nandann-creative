import apiFetch from '@wordpress/api-fetch';

const NAMESPACE = 'nandfilemr/v1';

export const api = {
    /**
     * Get list of files in a directory
     * @param {string} path Relative path
     */
    getFiles: async (path = '') => {
        try {
            return await apiFetch({ path: `/${NAMESPACE}/files?path=${path}` });
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * Create a directory
     * @param {string} path Parent path
     * @param {string} name Directory name
     */
    createDirectory: async (path, name) => {
        return await apiFetch({
            path: `/${NAMESPACE}/make-dir`,
            method: 'POST',
            data: { path, name }
        });
    },

    /**
     * Get file content
     * @param {string} path File path
     */
    getFileContent: async (path) => {
        return await apiFetch({ path: `/${NAMESPACE}/content?path=${path}` });
    },

    /**
     * Update file content
     * @param {string} path File path
     * @param {string} content New content
     */
    updateFileContent: async (path, content) => {
        return await apiFetch({
            path: `/${NAMESPACE}/content`,
            method: 'POST',
            data: { path, content }
        });
    },

    /**
     * Get settings
     */
    getSettings: async () => {
        return await apiFetch({ path: `/${NAMESPACE}/settings` });
    },

    /**
     * Update settings
     * @param {object} settings
     */
    updateSettings: async (settings) => {
        return await apiFetch({
            path: `/${NAMESPACE}/settings`,
            method: 'POST',
            data: settings
        });
    }
};
