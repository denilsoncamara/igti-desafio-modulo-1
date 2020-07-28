const URLDEV = 'http://localhost:3001/users';
const URL = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

let globalUsers = [];
let globalUsersFiltered = [];

async function init() {
  await getUsers();

  globalUsersFiltered = [...globalUsers];

  filterUsers();
  changeTheme();

  render();
}

async function getUsers() {
  const response = await fetch(URL);
  const json = await response.json();
  const users = json.results;
  // const users = await response.json();

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
    ${globalUsersFiltered.map(user => {
      return `
        <li>
          <img src="${user.picture}" alt="Foto do usuário">
          <strong>${user.name},</strong> <span>${user.age} anos</span>
        </li>
      `;
    }).join('')}
  `;
  
  renderStatistics();
}

function renderStatistics() {
  const listStatisticsEl = document.getElementById('listStatistics');
  const quantityUsersEl = document.getElementById('quantityUsers');
  
  const men = globalUsersFiltered.filter(user => user.gender === 'male');
  const women = globalUsersFiltered.filter(user => user.gender === 'female');
  
  const sumAge = globalUsersFiltered.reduce((acc, curr) => acc + curr.age, 0);

  const averageAges = sumAge / globalUsersFiltered.length;
  
  listStatisticsEl.innerHTML = `
    <li>Homens: <span>${men.length}</span></li>
    <li>Mulheres: <span>${women.length}</span></li>
    <li>Soma das idades: <span>${sumAge}</span></li>
    <li>Média das idades: <span>${averageAges.toFixed(2)}</span></li>
  `;
  
  quantityUsersEl.innerHTML = `
    ${globalUsersFiltered.length} usuário(s) encontrado(s)
  `;
}

function filterUsers() {
  const inputSearch = document.getElementById('inputSearch');
  const btnSearch = document.getElementById('btnSearch');

  inputSearch.addEventListener('blur', () => {
    // if (inputSearch.value !== '') {
    //   inputSearch.classList.add('bordered-input');
    //   btnSearch.classList.add('bordered-button');
    // } else {
    //   inputSearch.classList.remove('bordered-input');
    //   btnSearch.classList.remove('bordered-button');
    // }
  });

  btnSearch.addEventListener('click', () => {
    const filteredValue = inputSearch.value.toLowerCase();
    
    globalUsersFiltered = globalUsers.filter(user =>
      user.nameLowerCase.includes(filteredValue)
    );

    render();
  });
}

function changeTheme() {
  const iconThemeEl = document.querySelector('[data-icon="mdi:theme-light-dark"]');
  const headEl = document.querySelector('head');
  
  let lightTheme = localStorage.getItem('@GetUser:theme');
  let link = document.createElement('link');

  if (lightTheme) {
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', lightTheme);
    
    headEl.append(link);
  }
  
  iconThemeEl.addEventListener('click', () => {
    if (lightTheme) {
      lightTheme = null;
      localStorage.removeItem('@GetUser:theme');
      link.remove(link);
    } else {
      localStorage.setItem('@GetUser:theme', './styles/light-theme.css');
      lightTheme = localStorage.getItem('@GetUser:theme');
      
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', lightTheme);
      
      headEl.append(link);
    }
  });
}

init();