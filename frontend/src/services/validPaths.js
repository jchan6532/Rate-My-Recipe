const validPaths = [
  '/welcomeback',
  '/',
  '/profile',
  '/recipe/:recipeId',
  '/settings',
  '/myrecipes',
];

export const isValidPath = (currPath) => {
  return validPaths.some((path) => {
    const regexPath = new RegExp(`^${path.replace(/:\w+/g, '[^/]+')}$`);
    return regexPath.test(currPath);
  });
};
