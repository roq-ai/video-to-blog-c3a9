const mapping: Record<string, string> = {
  articles: 'article',
  organizations: 'organization',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
