import useAuth from '../../services/useAuth';

export const PostLogin = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const access_token = useAuth(code);

  localStorage.setItem('code', code);
  if (access_token != undefined) {
    localStorage.setItem('access_token', access_token);
    window.location.href = '/home';
  }

}