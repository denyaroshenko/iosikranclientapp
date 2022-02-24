export default function authHeader() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = null;

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
