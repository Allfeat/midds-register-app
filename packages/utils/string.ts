/**
 * Capitalize first letter
 */
export const capitalizeFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1)
}


/**
 * Slugify a string
 */
export const slugify = (value: string) => {
    return value
        .toString()              // Cast to string (optional)
        .normalize('NFKD')       // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase()           // Convert the string to lowercase letters
        .trim()                  // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-')    // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/_/g,'-')       // Replace _ with -
        .replace(/--+/g, '-')    // Replace multiple - with single -
        .replace(/-$/g, '')      // Remove trailing -
}
