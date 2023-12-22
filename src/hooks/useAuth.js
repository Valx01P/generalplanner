import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    let isAdmin = false;
    let id = '';
    let status = 'User';

    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles } = decoded.UserInfo;

        // Extract the users from the ids array and entities object
        const user = users?.find(user => user.username === username);
        
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