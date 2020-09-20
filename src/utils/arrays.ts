export const groupBy = (xs: any[], key: number) => {
  return xs.reduce((rv, x: string) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
