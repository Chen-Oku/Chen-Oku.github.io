export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string;
  language: string;
  updatedAt: string;
  stargazersCount: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  isFeatured: boolean;
}

interface GithubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

export async function getGithubRepos(
  username: string,
  options: {
    includeForks?: boolean;
    maxRepos?: number;
    excludeArchived?: boolean;
    featuredRepos?: string[];
  } = {}
): Promise<GithubRepo[]> {
  const {
    includeForks = false,
    maxRepos = 6,
    excludeArchived = true,
    featuredRepos = [],
  } = options;

  try {
    const token = import.meta.env.GITHUB_TOKEN;
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      console.warn(
        `GitHub API request failed: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const repos = (await response.json()) as GithubApiRepo[];

    const normalizedFeaturedRepos = featuredRepos.map((name) =>
      name.toLowerCase()
    );

    return repos
      .filter((repo) => (includeForks ? true : !repo.fork))
      .filter((repo) => (excludeArchived ? !repo.archived : true))
      .sort((a, b) => {
        const aFeatured = normalizedFeaturedRepos.includes(a.name.toLowerCase());
        const bFeatured = normalizedFeaturedRepos.includes(b.name.toLowerCase());
        if (aFeatured === bFeatured) return 0;
        return aFeatured ? -1 : 1;
      })
      .slice(0, maxRepos)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "",
        htmlUrl: repo.html_url,
        homepage: repo.homepage || "",
        language: repo.language || "",
        updatedAt: repo.updated_at,
        stargazersCount: repo.stargazers_count,
        topics: repo.topics || [],
        fork: repo.fork,
        archived: repo.archived,
        isFeatured: normalizedFeaturedRepos.includes(repo.name.toLowerCase()),
      }));
  } catch (error) {
    console.warn("Failed to fetch GitHub repositories:", error);
    return [];
  }
}
