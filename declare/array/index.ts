/* eslint-disable no-extend-native */
export {};

Array.prototype.first = function (defaultValue: any) {
  return this[0] || defaultValue || undefined;
};

Array.prototype.last = function (defaultValue: any) {
  return Array.isArray(this)
    ? this[this.length - 1] || defaultValue || undefined
    : undefined;
};

Array.prototype.searchAllProps = function (keyword: string | number) {
  return this.filter(x => {
    return Object.keys(x).some(function (key) {
      return (
        String(x[key]).changeAlias().search(String(keyword).changeAlias()) !==
        -1
      );
    });
  });
};

Array.prototype.searchByKey = function (keyword: string | number, key: string) {
  return this.filter(x => {
    return (
      String(x[key]).changeAlias().search(String(keyword).changeAlias()) !== -1
    );
  });
};
