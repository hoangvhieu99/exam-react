import { useState, useEffect } from "react";
import todoApi from "./../../../api/todoApi";

export default function useUserTodo(userId) {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          const result = await todoApi.get(userId);
          setTodo(result);
        } catch (error) {
          console.log("Failed to fetch product", error);
        }
        setLoading(false);
      })();
    }, 1000);
  }, [userId]);
  return { todo, setTodo, loading, setLoading };
}
