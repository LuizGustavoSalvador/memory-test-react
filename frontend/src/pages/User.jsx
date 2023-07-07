import UpdateUser from '../components/UpdateUser';
import CreateUser from '../components/CreateUser';

const UserPage = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

  return (
    <div className='container user-component'>
      {isAuthenticated ? (
        <UpdateUser />
      ) : (
        <CreateUser />
      )}
    </div>
  );
};

export default UserPage;
