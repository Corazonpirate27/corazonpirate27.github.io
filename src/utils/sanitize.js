/**
 * Sanitizes input text by removing HTML-like tags.
 *
 * @param {string} text - The input text to sanitize.
 * @returns {string} The sanitized text.
 */
export const sanitizeInput = (text) => {
    if (typeof text !== 'string') return '';
    // Improved regex to strip HTML tags while avoiding common mathematical symbols
    // It looks for a '<' followed by a letter or slash, then anything until '>',
    // requiring the closing '>' to be present.
    return text.replace(/<[a-zA-Z\/][^>]*>/gm, '');
};
