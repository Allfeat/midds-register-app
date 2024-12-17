/**
 * Split text
 * @returns Words or characters
 */
export const splitText = (text: string, mode: 'words' | 'words-punc' | 'chars' = 'words') => {
    if (mode === 'words') {
        return text.trim().split(/\s+/)
    } else if (mode === 'words-punc') {
        return text.match(/\b[^\s]+\b/g) || []
    } else if (mode === 'chars') {
        return text.split('')
    }
}
