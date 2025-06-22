export const replaceMathBracket = (value: string) => {
  return value
    .replace(/\[([\s\S]+?)\]/g, (_match, p1) => {
      return `$$${p1}$$`;
    })
    .replace(/\(([\s\S]+?)\)/g, (_match, p1) => {
      return `$${p1}$`;
    });
};
