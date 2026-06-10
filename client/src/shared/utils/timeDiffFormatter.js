export const timeDiffFormatter = (timestamp) => {
  const diffInSeconds = (new Date() - new Date(timestamp)) / 1000;
  if (diffInSeconds > 60 * 60 * 24 * 365)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24 * 365))}y ago`; // years

  if (diffInSeconds > 60 * 60 * 24 * 30)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24 * 30))}m ago`; // months

  if (diffInSeconds > 60 * 60 * 24)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24))}d ago`; // days

  if (diffInSeconds > 60 * 60)
    return `${Math.floor(diffInSeconds / (60 * 60))}h ago`; // hours

  if (diffInSeconds > 60)
    return `${Math.floor(diffInSeconds / 60)}min ago`; // minutes
  else return `${Math.floor(diffInSeconds)}s ago`; // seconds
};
