export {};
declare global {
  interface Array<T> {
    /**
     * Get first element of array. If array is empty, return undefined
     */
    first(defaultValue?: T): T | undefined;
    /**
     * Get last element of array. If array is empty, return undefined
     */
    last(defaultValue?: T): T | undefined;
    /**
     * Search all elements in array by keyword
     */
    searchAllProps(keyword: string | number): Array<T>;

    /**
     * Search all elements in array by keyword via key
     */
    searchByKey(keyword: string | number, key: string): Array<T>;
  }
}
