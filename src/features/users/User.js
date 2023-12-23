import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

//destructure prop userId
const User = ({ userId }) => {
    const { user } = useGetUsersQuery("usersList", {
      selectFromResult: ({ data }) => ({
        user: data?.entities[userId],
      }),
    });
  
    const navigate = useNavigate();
  
    if (user) {
      const handleEdit = () => navigate(`/dash/users/${userId}`);
  
      const userRolesString = user.roles.toString().replaceAll(",", ", ");
  
      return (
        <tr className="table__row user">
          <td className={`table__cell `}>{user.username}</td>
          <td className={`table__cell `}>{userRolesString}</td>
          <td className={`table__cell `}>{user.name}</td>
          <td className={`table__cell `}>{user.description}</td>
          {/* Conditionally render the edit button or "N/A" */}
          {user.username !== "Admin" &&
          user.username !== "User" &&
          user.username !== "admin" &&
          user.username !== "user" ? (
            <td className={`table__cell `}>
              <button
                className="icon-button table__button"
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </td>
          ) : (
            <td className={`table__cell `}>N/A</td>
          )}
        </tr>
      );
    } else return null;
  };
  
  const memoizedUser = memo(User);
  
  export default memoizedUser;