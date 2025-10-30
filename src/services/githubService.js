/**
 * GitHub API Service
 * Handles all interactions with the GitHub API
 */

const axios = require('axios');

class GitHubService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.apiClient = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
  }

  /**
   * Fetch user's starred repositories with pagination
   */
  async getStarredRepos(page = 1, perPage = 100) {
    try {
      const response = await this.apiClient.get('/user/starred', {
        params: { page, per_page: perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching starred repos:', error.message);
      throw new Error('Failed to fetch starred repositories');
    }
  }

  /**
   * Fetch all starred repositories (handling pagination)
   */
  async getAllStarredRepos() {
    const allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const repos = await this.getStarredRepos(page, 100);
      allRepos.push(...repos);
      
      // GitHub returns less than requested if we're on the last page
      if (repos.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allRepos;
  }

  /**
   * Get user profile information
   */
  async getUserProfile() {
    try {
      const response = await this.apiClient.get('/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      throw new Error('Failed to fetch user profile');
    }
  }

  /**
   * Classify repositories into groups based on topics, languages, and descriptions
   */
  classifyRepositories(repos) {
    const groups = {
      byTopic: {},
      byLanguage: {},
      byDescription: {},
      unclassified: []
    };

    repos.forEach(repo => {
      // Group by topics
      if (repo.topics && repo.topics.length > 0) {
        repo.topics.forEach(topic => {
          if (!groups.byTopic[topic]) {
            groups.byTopic[topic] = [];
          }
          groups.byTopic[topic].push(repo);
        });
      }

      // Group by language
      if (repo.language) {
        if (!groups.byLanguage[repo.language]) {
          groups.byLanguage[repo.language] = [];
        }
        groups.byLanguage[repo.language].push(repo);
      }

      // Group by keywords in description
      if (repo.description) {
        const keywords = this.extractKeywords(repo.description);
        keywords.forEach(keyword => {
          if (!groups.byDescription[keyword]) {
            groups.byDescription[keyword] = [];
          }
          groups.byDescription[keyword].push(repo);
        });
      }

      // Track unclassified repos
      if (!repo.topics?.length && !repo.language && !repo.description) {
        groups.unclassified.push(repo);
      }
    });

    return groups;
  }

  /**
   * Extract keywords from description
   */
  extractKeywords(description) {
    // Common programming-related keywords to look for
    const keywords = [
      'api', 'framework', 'library', 'tool', 'cli', 'web', 'mobile',
      'machine learning', 'ai', 'database', 'frontend', 'backend',
      'devops', 'testing', 'automation', 'security', 'blockchain',
      'game', 'bot', 'plugin', 'extension', 'template', 'boilerplate'
    ];

    const lowerDesc = description.toLowerCase();
    return keywords.filter(keyword => lowerDesc.includes(keyword));
  }

  /**
   * Format repositories for display
   */
  formatRepoData(repos) {
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      homepage: repo.homepage,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      owner: {
        login: repo.owner.login,
        avatarUrl: repo.owner.avatar_url
      }
    }));
  }
}

module.exports = GitHubService;
