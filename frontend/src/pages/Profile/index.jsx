import { useAuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Profile {user}</h1>
    </div>
  );
};

export default Profile;
