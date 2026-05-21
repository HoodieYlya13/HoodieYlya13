const fs = require("fs");

async function syncPinnedRepos() {
  const token = process.env.GITHUB_TOKEN;
  const username = "HoodieYlya13";

  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "node-fetch",
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      process.exit(1);
    }

    const pinnedRepoNames = json.data.user.pinnedItems.nodes.map(
      (repo) => repo.name,
    );
    console.log(
      "Fetched pinned repositories from GitHub profile:",
      pinnedRepoNames,
    );

    const profilePath = "./profile.json";
    const rawData = fs.readFileSync(profilePath, "utf8");
    const profile = JSON.parse(rawData);

    profile.pinned_repositories = pinnedRepoNames;

    fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2) + "\n");
    console.log(
      "✅ Successfully synchronized pinned_repositories into profile.json!",
    );
  } catch (error) {
    console.error("Failed to sync pinned repositories:", error);
    process.exit(1);
  }
}

syncPinnedRepos();
