import { useState, useEffect } from "react";
import userApi from "./../../../api/userApi";

export default function useUserDetails() {
  const [users, setUsers] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await userApi.getAll();
        setUsers(result);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoadingUser(false);
    })();
  }, []);

  return { users, loadingUser };
}
