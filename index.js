const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  const { Octokit } = require('@octokit/rest')

  const octokit = new Octokit({
    baseUrl: 'https://api.github.com',
    auth: "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",
    log: {
      debug: () => { },
      info: () => { },
      warn: console.warn,
      error: console.error
    },
    request: {
      agent: undefined,
      fetch: undefined,
      timeout: 0
    }
  })

  const owner = "executive-office-of-education"
  const repo = "EOEAAAService"
  const prNumber = 189

  const run = async () => {
    try {

      const pullRequests = await octokit.pulls.listCommits({ owner: owner, repo: repo, pull_number: prNumber })

      pullRequests.data.forEach((pr) => {
        const location = pr.commit.url.search("commits/")
        console.log('message', pr.commit.url.substr(location + "commits/".length, 7), ' ', pr.commit.message)
      })
    } catch (e) {
      console.log("Cannot find PR", `${owner}/${repo}#${prNumber}`, e.status, e.message)
      return null
    }
  }

  run()
} catch (error) {
  core.setFailed(error.message);
}