import { useParams, useLocation } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const location = useLocation();
  const uname = location.pathname.split('/').pop();
  return (
    <div>
      <h1>Profile {uname}</h1>
    </div>
  );
};

export default Profile;
