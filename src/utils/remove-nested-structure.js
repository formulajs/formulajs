// remove nested structure from the response
export const removeNestedStructure = (json) => {
  return json.map(item => {
    const flat = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value !== 'object' || value === null) {
        flat[key] = value;
      }
    }
    return flat;
  });
}