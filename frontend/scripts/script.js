const URL = 'http://localhost:3001/users';

let globalUsers = [];

async function init() {
  await getUsers();

  render();
}

async function getUsers() {
  const response = await fetch(URL);
  const users = await response.json();

  globalUsers = users.map(user => {
    const {
      name: { first, last },
      picture: { thumbnail },
      dob: { age },
      gender
    } = user;

    const name = `${first} ${last}`;

    return {
      name,
      nameLowerCase: name.toLowerCase(),
      picture: thumbnail,
      age,
      gender
    }
  });
}

async function render() {
  const listUsersEl = document.getElementById('listUsers');

  listUsersEl.innerHTML = `
    ${globalUsers.map(user => {
      return `
        <li>
          <img src="${user.picture}" alt="Foto do usuário">
          <strong>${user.name},</strong> <span>${user.age} anos</span>
        </li>
      `;
    }).join('')}
  `;
}

init();