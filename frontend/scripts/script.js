window.addEventListener('load', () => {
  getUsers();
  render();
});

const URL = 'http://localhost:3001/users';

async function getUsers() {
  const response = await fetch(URL);
  const users = await response.json();

  const formatedUsers = users.map(user => {
    const {
      name: { first, last },
      picture: { thumbnail },
      dob: { age },
      gender
    } = user;

    return {
      name: `${first} ${last}`,
      picture: thumbnail,
      age,
      gender
    }
  });

  console.log(formatedUsers);
}

function render() {

}
