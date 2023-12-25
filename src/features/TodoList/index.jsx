import React, { useState } from "react";
import { Select } from "antd";
import useUserDetails from "./hooks/useUserDetails";
import useUserTodo from "./hooks/useUserTodo";
import TodoListComponent from "./components/TodoList";
import DividerComponent from "./components/Divider";
const { Option } = Select;
const TodoList = () => {
  const { users } = useUserDetails();
  const [userId, setUserId] = useState(null);
  const { todo, setTodo } = useUserTodo(userId);

  const onChange = (selectedUserId) => {
    setUserId(selectedUserId);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <DividerComponent title="User" />
      <Select
        className="w-52"
        showSearch
        placeholder="Select user"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
      >
        {users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>
      <DividerComponent title="Tasks" />
      <TodoListComponent todo={todo} setTodo={setTodo} />
    </>
  );
};
export default TodoList;
