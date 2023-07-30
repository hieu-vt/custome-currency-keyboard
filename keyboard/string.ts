export const splice = (cur: string, idx: number, rem: number, str: string) => {
  return cur.slice(0, idx) + str + cur.slice(idx + Math.abs(rem));
};

export const removeAt = function (cur: string, index: number) {
  return cur.substring(0, index) + cur.substring(index + 1, cur.length);
};
