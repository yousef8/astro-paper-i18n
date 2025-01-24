const getRelativePath = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;

  if (path.startsWith(baseUrl.replace(/\/^/, ""))) return path;

  const sanitizedPath = path.replaceAll(/^\/|\/$/g, "");

  return baseUrl + (baseUrl.endsWith("/") ? "" : "/") + sanitizedPath;
};

export default getRelativePath;
