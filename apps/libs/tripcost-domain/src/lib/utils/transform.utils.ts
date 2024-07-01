/**
 * Helper function to deep cloned an object (not shallow copy).
 * @param toClone Object to clone
 * @returns Cloned object with no reference
 */
export const deepClone = <TReturn>(toClone: any): TReturn => JSON.parse(JSON.stringify(toClone));