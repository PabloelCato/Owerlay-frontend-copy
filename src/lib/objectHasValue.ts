export const objectHasValue = (obj: Record<string, any>): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if (objectHasValue(obj[key])) {
          return true; // Recursively check nested objects
        }
      } else if (obj[key] !== null && obj[key] !== undefined) {
        return true; // Found a non-null, non-undefined value
      }
    }
  }
  return false; // No value found in the object
};
