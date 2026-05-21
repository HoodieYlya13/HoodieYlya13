const fs = require("fs");

const rawData = fs.readFileSync("profile.json", "utf8");
const profile = JSON.parse(rawData);

const formatPeriod = (period) => {
  if (!period.includes("-")) return period;

  const [start, end] = period.split(" - ");
  const startYear = start.split("/")[0];
  const endYear = end.split("/")[0];

  if (startYear === endYear) return startYear;

  return `${startYear} - ${endYear}`;
};

const formatExp = (exp) => {
  return `    <li><b>${exp.role} @ ${exp.company}</b> <i>(${formatPeriod(exp.range)})</i><br>${exp.bullets[0]}</li>`;
};

const techExp = [
  profile.timeline_engineering[0],
  profile.timeline_engineering[1],
  profile.timeline_engineering[2],
]
  .map(formatExp)
  .join("\n");

const logExp = [
  profile.timeline_foundational[1],
  profile.timeline_foundational[0],
  profile.timeline_foundational[2],
]
  .map(formatExp)
  .join("\n");

const leadExp = [
  profile.timeline_foundational[6],
  profile.timeline_foundational[5],
  profile.timeline_foundational[4],
  profile.timeline_foundational[3],
]
  .map(formatExp)
  .join("\n");

const educationHTML = profile.academic_history
  .map(
    (edu) =>
      `- **${edu.degree}** | _${edu.institution.split(" Mathematics")[0].split(" Department")[0]} (${edu.range})_`,
  )
  .join("\n");

const locations = profile.placement_preferences.target_regions.join(", ");
const fields = profile.placement_preferences.technical_domains.join(" • ");

const findChannel = (platform) =>
  profile.communication.channels.find((c) => c.platform === platform).value;

const traits = profile.skills_matrix.leadership_traits;
const formattedTraits = `${traits
  .slice(0, -1)
  .map((t) => t.toLowerCase())
  .join(", ")}, and ${traits[traits.length - 1].toLowerCase()}`;

const readmeContent = `
<div align="center">
  <a href="${profile.communication.links.live_portfolio}">
    <img src="https://www.hy13dev.com/logo.png" alt="Ylya Martchenko Logo" width="150" />
  </a>

  <h1>Hi there, I'm ${profile.identity.name}! 👋</h1>
  
  <h3>${profile.hero_marquee.join(" | ")}</h3>
  
  <p>📍 ${profile.identity.current_location} | Open to opportunities in ${locations} (${profile.placement_preferences.preference})</p>
  <p>🎯 Interests: <i>${fields}</i></p>

  <p>
    <a href="mailto:${findChannel("Email")}">
      <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
    </a>
    <a href="${findChannel("LinkedIn")}">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="${profile.communication.links.live_portfolio}">
      <img src="https://img.shields.io/badge/Portfolio-252525?style=for-the-badge&logo=mac&logoColor=white" alt="Portfolio" />
    </a>
    <a href="${profile.communication.links.downloadable_resume}">
      <img src="https://img.shields.io/badge/Resume-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Resume" />
    </a>
  </p>
</div>

---

## 🚀 About Me

- 💻 Coding since **${profile.identity.coding_experience_since}**. Currently working as a **${profile.identity.current_status}**.
- 🧠 Specializing in **${profile.hero_marquee[3]}** and **${profile.hero_marquee[4]}**, with an intense focus on scaling architectures.
- 🔭 Passionate about exploring new frontiers: **Cloud, Space Engineering, IoT, and Electronics**.
- 🗣️ Multilingual: **${profile.communication.languages.map((l) => `${l.name} (${l.cefr})`).join(", ")}**.
- 🤝 Leadership & Execution: ${formattedTraits}.

---

## 🛠️ Tech Stack & Tools

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,angular,ts,nodejs,postgres,mysql,graphql,postman,docker,rust&perline=11" alt="Web and Backend Skills" />
    <br />
    <img src="https://skillicons.dev/icons?i=c,cpp,cs,java,spring,git,github,gitlab,bash,linux,apple,windows&perline=12" alt="Systems and Languages" />
  </a>
</p>

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.hy13dev.com/api?username=HoodieYlya13&show_icons=true&theme=transparent&hide_border=true&title_color=3382ed&text_color=ffffff&icon_color=3382ed" alt="Ylya's GitHub Stats" />
  <img src="https://github-readme-stats.hy13dev.com/api/top-langs/?username=HoodieYlya13&layout=compact&theme=transparent&hide_border=true&title_color=3382ed&text_color=ffffff" alt="Top Languages" />
</p>

---

## 💼 Experience & Leadership

<details>
  <summary><b>💻 Tech & Development</b></summary>
  <br>
  <ul>
${techExp}
  </ul>
</details>

<details>
  <summary><b>⚙️ Engineering & Logistics</b></summary>
  <br>
  <ul>
${logExp}
  </ul>
</details>

<details>
  <summary><b>🌱 Early Leadership & Civic Impact</b></summary>
  <br>
  <ul>
${leadExp}
  </ul>
</details>

---

## 🎓 Education

${educationHTML}
`;

fs.writeFileSync("README.md", readmeContent.trim() + "\n");
console.log("✅ README.md has been successfully generated from profile.json!");
