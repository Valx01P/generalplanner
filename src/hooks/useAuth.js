import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useGetUsersQuery, selectAllUsers } from '../features/users/usersApiSlice';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    const { data: users, isSuccess } = useGetUsersQuery();
    console.log(users);

    let isAdmin = false;
    let id = '';
    let status = 'User';

    if (token && isSuccess) {
        const decoded = jwtDecode(token);
        const { username, roles } = decoded.UserInfo;

        // Extract the users from the ids array and entities object
        const allUsers = selectAllUsers(users);
        const user = allUsers.ids?.map(id => allUsers.entities?.[id]).find((user) => user?.username === username);

        isAdmin = roles.includes('Admin');

        if (isAdmin) status = 'Admin';

        if (user) {
            id = user._id || '';
        }

        return { username, roles, id, status, isAdmin };
    }

    return { username: '', roles: [], id: '', isAdmin, status };
};

export default useAuth;