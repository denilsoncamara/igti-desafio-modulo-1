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

function renderStatistics() {
  const listStatisticsEl = document.getElementById('listStatistics');
  const quantityUsersEl = document.getElementById('quantityUsers');
  
  const men = globalUsers.filter(user => user.gender === 'male');
  const women = globalUsers.filter(user => user.gender === 'female');
  
  const sumAge = globalUsers.reduce((acc, curr) => acc + curr.age, 0);

  const averageAges = sumAge / globalUsers.length;
  
  listStatisticsEl.innerHTML = `
    <li>Homens: <span>${men.length}</span></li>
    <li>Mulheres: <span>${women.length}</span></li>
    <li>Soma das idades: <span>${sumAge}</span></li>
    <li>Média das idades: <span>${averageAges.toFixed(2)}</span></li>
  `;
  
  quantityUsersEl.innerHTML = `
    ${globalUsers.length} usuário(s) encontrado(s)
  `;
}

init();