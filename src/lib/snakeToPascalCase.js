/**
 * Converts a snake case string to PascalCase.
 * 
 * @param {string} str - The snake case string to convert.
 * @returns {string} - The PascalCase version of the string.
 */
export function snakeToPascalCase(str) {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}