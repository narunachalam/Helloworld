const core = require('@actions/core');
const github = require('@actions/github');

try {
  const [owner, repo] = core.getInput("repository", { required: true }).split("/")
  // `prNumber` input defined in action metadata file
  const prNumber = core.getInput('prNumber');
  console.log(`Hello ${prNumber}!`);
  const time = (new Date()).toTimeString();
  const token = core.getInput('github_token');
  
  
  // Get the JSON webhook payload for the event that triggered the workflow

  const { Octokit } = require('@octokit/rest')

  const octokit = new Octokit({
    baseUrl: 'https://api.github.com',
    auth: token,
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

//  const owner = "narunachalam"
 // const repo = "Helloworld"
 

  const run = async () => {
    try {

      const pullRequests = await octokit.pulls.listCommits({ owner: owner, repo: repo, pull_number: prNumber })

      let prInfo = ""
      pullRequests.data.forEach((pr) => {
        const location = pr.commit.url.search("commits/")
        prInfo = prInfo.concat(' ', pr.commit.url.substr(location + "commits/".length, 7)+ ' '+ pr.commit.message)  
         console.log('message', prInfo)
        
      })
      const payload = JSON.stringify(github.context.payload, undefined, 2)
      console.log(`The event payload: ${payload}`);      
      core.info(`\n\n${prInfo}`)
      core.setOutput("prInfo", prInfo);
      //core.setOutput("prInfo", prInfo);
      return prInfo
    } catch (e) {
      console.log("Cannot find PR", `${owner}/${repo}#${prNumber}`, e.status, e.message)
      return null
    }
  }

  const prInfo  =  run()
 // core.setOutput("prInfo", prInfo);
} catch (error) {
  core.setFailed(error.message);
}
