export const checkFuture = (date: Date) => {
  const now = new Date();
  if (date.getFullYear() >= now.getFullYear() && date.getMonth() > now.getMonth()) {
    return true;
  }
  return false;
};
