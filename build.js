const fs = require('fs');

const rawData = fs.readFileSync('profile.json', 'utf8');
const profile = JSON.parse(rawData);

const experienceHTML = profile.experience.map(exp => `
    <li><b>${exp.title} @ ${exp.organization.split(' | ')[0]}</b> <i>(${exp.period.replace('/', '-')})</i><br>${exp.description[0]}</li>`).join('');

const educationHTML = profile.education.map(edu => `
- **${edu.title}** | _${edu.school} (${edu.year})_`).join('\n');

const readmeContent = `
<div align="center">
  <a href="${profile.links.portfolio}">
    <img src="https://www.hy13dev.com/logo.png" alt="Ylya Martchenko Logo" width="150" />
  </a>

  <h1>Hi there, I'm ${profile.personal_info.full_name}! 👋</h1>
  
  <h3>${profile.personal_info.status}</h3>
  
  <p>📍 ${profile.personal_info.current_location} | ${profile.professional_summary.availability.split('.')[0]}</p>
</div>

---

## 🚀 About Me
- 💻 Coding since **${profile.professional_summary.coding_experience_since}**. 
- 🧠 Specializing in **${profile.professional_summary.specializations.join(' and ')}**.
- 🗣️ Multilingual: **${profile.professional_summary.languages.join(', ')}**.

---

## 💼 Experience & Leadership
<details>
  <summary><b>💻 Career Timeline</b></summary>
  <br>
  <ul>
    ${experienceHTML}
  </ul>
</details>

---

## 🎓 Education
${educationHTML}
`;

fs.writeFileSync('README.md', readmeContent.trim());
console.log('✅ README.md has been successfully generated from profile.json!');