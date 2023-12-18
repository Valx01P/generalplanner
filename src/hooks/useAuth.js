import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { selectAllUsers } from "../features/users/usersApiSlice"
import { jwtDecode } from 'jwt-decode'
// const { default: jwtDecode } = require("jwt-decode");

const useAuth = () => {
    const allUsers = useSelector(selectAllUsers);
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let id = ""
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo
        const user = allUsers.find((user) => user.username === username);

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"
        
        if (user) {
            id = user._id || '';
          }

        return { username, roles, id, status, isAdmin }
    }

    return { username: '', roles: [], id: '', isAdmin, status }
}
export default useAuth