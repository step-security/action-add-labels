import * as github from '@actions/github';
import * as core from '@actions/core';
import axios, { isAxiosError } from 'axios';

async function validateSubscription(): Promise<void> {
  const API_URL = `https://agent.api.stepsecurity.io/v1/github/${process.env.GITHUB_REPOSITORY}/actions/subscription`;

  try {
    await axios.get(API_URL, { timeout: 3000 });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      core.error(
        'Subscription is not valid. Reach out to support@stepsecurity.io'
      );
      process.exit(1);
    } else {
      core.info('Timeout or API not reachable. Continuing to next step.');
    }
  }
}

async function run(): Promise<void> {
  try {
    await validateSubscription();
    const githubToken = core.getInput('github_token');

    const labels = core
      .getInput('labels')
      .split('\n')
      .filter(l => l !== '');
    const [owner, repo] = core.getInput('repo').split('/');
    const number =
      core.getInput('number') === ''
        ? github.context.issue.number
        : parseInt(core.getInput('number'));

    if (labels.length === 0) {
      return;
    }

    const octokit = github.getOctokit(githubToken);
    await octokit.rest.issues.addLabels({
      labels,
      owner,
      repo,
      issue_number: number
    });
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

run();
