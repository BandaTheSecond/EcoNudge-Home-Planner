export const sum = (arr) => arr.reduce((a, b) => a + b, 0);
export const fmtDate = (iso) => new Date(iso).toDateString();
