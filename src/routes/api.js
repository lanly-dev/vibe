/**
 * API routes for repository management
 */

const express = require('express');
const GitHubService = require('../services/githubService');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

/**
 * Get all starred repositories
 */
router.get('/starred', isAuthenticated, async (req, res) => {
  try {
    const githubService = new GitHubService(req.session.accessToken);
    const repos = await githubService.getAllStarredRepos();
    const formattedRepos = githubService.formatRepoData(repos);
    
    res.json({
      count: formattedRepos.length,
      repositories: formattedRepos
    });
  } catch (error) {
    console.error('Error fetching starred repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch starred repositories' });
  }
});

/**
 * Get classified repositories
 */
router.get('/starred/classified', isAuthenticated, async (req, res) => {
  try {
    const githubService = new GitHubService(req.session.accessToken);
    const repos = await githubService.getAllStarredRepos();
    const formattedRepos = githubService.formatRepoData(repos);
    const classified = githubService.classifyRepositories(repos);
    
    // Format classification data
    const formattedClassification = {
      total: formattedRepos.length,
      byTopic: Object.entries(classified.byTopic).map(([topic, repos]) => ({
        topic,
        count: repos.length,
        repositories: githubService.formatRepoData(repos)
      })).sort((a, b) => b.count - a.count),
      byLanguage: Object.entries(classified.byLanguage).map(([language, repos]) => ({
        language,
        count: repos.length,
        repositories: githubService.formatRepoData(repos)
      })).sort((a, b) => b.count - a.count),
      byDescription: Object.entries(classified.byDescription).map(([keyword, repos]) => ({
        keyword,
        count: repos.length,
        repositories: githubService.formatRepoData(repos)
      })).sort((a, b) => b.count - a.count),
      unclassified: {
        count: classified.unclassified.length,
        repositories: githubService.formatRepoData(classified.unclassified)
      }
    };
    
    res.json(formattedClassification);
  } catch (error) {
    console.error('Error classifying repos:', error.message);
    res.status(500).json({ error: 'Failed to classify repositories' });
  }
});

/**
 * Export repositories data
 */
router.get('/export', isAuthenticated, async (req, res) => {
  const format = req.query.format || 'json';
  
  try {
    const githubService = new GitHubService(req.session.accessToken);
    const repos = await githubService.getAllStarredRepos();
    const formattedRepos = githubService.formatRepoData(repos);
    const classified = githubService.classifyRepositories(repos);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      user: req.session.user,
      totalRepositories: formattedRepos.length,
      repositories: formattedRepos,
      classification: {
        byTopic: classified.byTopic,
        byLanguage: classified.byLanguage,
        byDescription: classified.byDescription,
        unclassified: classified.unclassified
      }
    };
    
    if (format === 'csv') {
      // Convert to CSV format
      const csvRows = ['Name,Description,Language,Topics,Stars,Forks,URL'];
      formattedRepos.forEach(repo => {
        const topics = repo.topics.join(';');
        const row = [
          repo.fullName,
          (repo.description || '').replace(/,/g, ';'),
          repo.language || '',
          topics,
          repo.stars,
          repo.forks,
          repo.url
        ].join(',');
        csvRows.push(row);
      });
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=starred-repos.csv');
      res.send(csvRows.join('\n'));
    } else {
      // JSON format
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=starred-repos.json');
      res.json(exportData);
    }
  } catch (error) {
    console.error('Error exporting repos:', error.message);
    res.status(500).json({ error: 'Failed to export repositories' });
  }
});

module.exports = router;
