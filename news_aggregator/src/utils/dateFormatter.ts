const timeAgo = (pubDate: string, pubDateTZ: string): string => {
  const date = new Date(pubDate + " " + pubDateTZ); // Convert to Date object
  const now = new Date();

  const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert to hours
  const diffDays = Math.floor(diffHours / 24); // Convert to days

  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }
};

export {
  timeAgo
};