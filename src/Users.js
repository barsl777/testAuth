import { Link } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = { usersList: [["Data"]] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    accessUsers: (state, action) => {
      state.usersList = action.payload;
    }
  }
});

export function Users() {
  const { usersList } = useSelector((state) => state.users);
  return (
    <div className="users">
      <h1>Users</h1>
      <table border="1">
        {usersList.map((item) => (
          <tr>
            {item.map((elm) => (
              <td>{elm}</td>
            ))}
          </tr>
        ))}
      </table>
      <Link href="/">Form</Link>
    </div>
  );
}

export const { accessUsers } = usersSlice.actions;
export default usersSlice.reducer;
