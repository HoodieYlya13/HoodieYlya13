const fs = require("fs");

const rawData = fs.readFileSync("profile.json", "utf8");
const profile = JSON.parse(rawData);

const formatPeriod = (period) => {
  if (!period.includes("-")) return period;
  const [start, end] = period.split(" - ");
  return `${start.split("/")[0]} - ${end.split("/")[0]}`;
};

const formatExp = (exp) => {
  const orgName = exp.organization.split(" | ")[0];
  return `    <li><b>${exp.title} @ ${orgName}</b> <i>(${formatPeriod(exp.period)})</i><br>${exp.description[0]}</li>`;
};

const techExp = [
  profile.experience[0],
  profile.experience[1],
  profile.experience[4],
]
  .map(formatExp)
  .join("\n");
const logExp = [
  profile.experience[3],
  profile.experience[2],
  profile.experience[5],
]
  .map(formatExp)
  .join("\n");
const leadExp = [
  profile.experience[9],
  profile.experience[8],
  profile.experience[7],
  profile.experience[6],
]
  .map(formatExp)
  .join("\n");

const educationHTML = profile.education
  .map(
    (edu) =>
      `- **${edu.title}** | _${edu.school.split(" Mathematics")[0].split(" Department")[0]} (${edu.year})_`,
  )
  .join("\n");

const readmeContent = `
<div align="center">
  <a href="${profile.links.portfolio}">
    <img src="https://www.hy13dev.com/logo.png" alt="Ylya Martchenko Logo" width="150" />
  </a>

  <h1>Hi there, I'm ${profile.personal_info.full_name}! 👋</h1>
  
  <h3>Full Stack Developer | Next.JS & React Expert | AI/RAG Enthusiast</h3>
  
  <p>📍 ${profile.personal_info.current_location} | Open to opportunities in LU, CH, or US</p>

  <p>
    <a href="mailto:${profile.contacts.find((c) => c.name === "Email").value}">
      <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
    </a>
    <a href="${profile.contacts.find((c) => c.name === "LinkedIn").value}">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
    <a href="${profile.links.portfolio}">
      <img src="https://img.shields.io/badge/Portfolio-252525?style=for-the-badge&logo=mac&logoColor=white" alt="Portfolio" />
    </a>
    <a href="${profile.links.resume}">
      <img src="https://img.shields.io/badge/Resume-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Resume" />
    </a>
  </p>
</div>

---

## 🚀 About Me

- 💻 Coding since **${profile.professional_summary.coding_experience_since}**. Currently working as a **${profile.personal_info.status}**.
- 🧠 Specializing in **${profile.professional_summary.specializations.join(" and ")}**, with a strong focus on integrating **AI/RAG** solutions.
- 🔭 Passionate about exploring new frontiers: **Cloud, Space Engineering, IoT, and Electronics**.
- 🗣️ Multilingual: **${profile.professional_summary.languages.join(", ")}**.
- 🤝 Soft Skills: ${profile.skills.soft_skills.slice(0, 2).join(" ").toLowerCase()}, ${profile.skills.soft_skills[2].toLowerCase()} ${profile.skills.soft_skills[3].toLowerCase()}, and ${profile.skills.soft_skills[4].toLowerCase()}.

---

## 🛠️ Tech Stack & Tools

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,angular,ts,js,nodejs,postgres,mysql,docker,python,rust&perline=11" alt="Web and Backend Skills" />
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
