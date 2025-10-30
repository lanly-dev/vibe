/**
 * Tests for GitHub Service
 */

const GitHubService = require('../src/services/githubService');

describe('GitHubService', () => {
  let service;

  beforeEach(() => {
    service = new GitHubService('mock-token');
  });

  describe('classifyRepositories', () => {
    test('classifies repos by topics', () => {
      const repos = [
        {
          id: 1,
          name: 'repo1',
          topics: ['javascript', 'nodejs'],
          language: 'JavaScript',
          description: 'A JavaScript library'
        },
        {
          id: 2,
          name: 'repo2',
          topics: ['javascript', 'react'],
          language: 'JavaScript',
          description: 'A React framework'
        }
      ];

      const classified = service.classifyRepositories(repos);

      expect(classified.byTopic['javascript']).toHaveLength(2);
      expect(classified.byTopic['nodejs']).toHaveLength(1);
      expect(classified.byTopic['react']).toHaveLength(1);
    });

    test('classifies repos by language', () => {
      const repos = [
        {
          id: 1,
          name: 'repo1',
          topics: [],
          language: 'JavaScript',
          description: 'JS repo'
        },
        {
          id: 2,
          name: 'repo2',
          topics: [],
          language: 'Python',
          description: 'Python repo'
        },
        {
          id: 3,
          name: 'repo3',
          topics: [],
          language: 'JavaScript',
          description: 'Another JS repo'
        }
      ];

      const classified = service.classifyRepositories(repos);

      expect(classified.byLanguage['JavaScript']).toHaveLength(2);
      expect(classified.byLanguage['Python']).toHaveLength(1);
    });

    test('tracks unclassified repos', () => {
      const repos = [
        {
          id: 1,
          name: 'repo1',
          topics: [],
          language: null,
          description: null
        }
      ];

      const classified = service.classifyRepositories(repos);

      expect(classified.unclassified).toHaveLength(1);
    });
  });

  describe('extractKeywords', () => {
    test('extracts known keywords from description', () => {
      const description = 'A web framework for building APIs';
      const keywords = service.extractKeywords(description);

      expect(keywords).toContain('web');
      expect(keywords).toContain('framework');
      expect(keywords).toContain('api');
    });

    test('handles case insensitivity', () => {
      const description = 'Machine Learning library';
      const keywords = service.extractKeywords(description);

      expect(keywords).toContain('machine learning');
      expect(keywords).toContain('library');
    });

    test('returns empty array for no matching keywords', () => {
      const description = 'Some random text';
      const keywords = service.extractKeywords(description);

      expect(keywords).toHaveLength(0);
    });
  });

  describe('formatRepoData', () => {
    test('formats repository data correctly', () => {
      const repos = [
        {
          id: 1,
          name: 'test-repo',
          full_name: 'user/test-repo',
          description: 'Test repository',
          language: 'JavaScript',
          topics: ['test'],
          stargazers_count: 100,
          forks_count: 20,
          html_url: 'https://github.com/user/test-repo',
          homepage: 'https://example.com',
          created_at: '2024-01-01',
          updated_at: '2024-01-02',
          owner: {
            login: 'user',
            avatar_url: 'https://example.com/avatar.jpg'
          }
        }
      ];

      const formatted = service.formatRepoData(repos);

      expect(formatted).toHaveLength(1);
      expect(formatted[0]).toMatchObject({
        id: 1,
        name: 'test-repo',
        fullName: 'user/test-repo',
        description: 'Test repository',
        language: 'JavaScript',
        topics: ['test'],
        stars: 100,
        forks: 20,
        url: 'https://github.com/user/test-repo',
        homepage: 'https://example.com',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
        owner: {
          login: 'user',
          avatarUrl: 'https://example.com/avatar.jpg'
        }
      });
    });

    test('handles missing optional fields', () => {
      const repos = [
        {
          id: 1,
          name: 'test-repo',
          full_name: 'user/test-repo',
          description: null,
          language: null,
          topics: null,
          stargazers_count: 0,
          forks_count: 0,
          html_url: 'https://github.com/user/test-repo',
          homepage: null,
          created_at: '2024-01-01',
          updated_at: '2024-01-02',
          owner: {
            login: 'user',
            avatar_url: 'https://example.com/avatar.jpg'
          }
        }
      ];

      const formatted = service.formatRepoData(repos);

      expect(formatted).toHaveLength(1);
      expect(formatted[0].description).toBeNull();
      expect(formatted[0].language).toBeNull();
      expect(formatted[0].topics).toEqual([]);
    });
  });
});
