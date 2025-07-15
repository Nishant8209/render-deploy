import  { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  firstName: string;
};

function GetAllUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        // Assuming response.data.data.users is the array
        setUsers(response.data.data.users);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li style={{ color: "white" }} key={user.id}>
              {user.firstName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllUser;
