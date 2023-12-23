import React, { useState } from "react";
import { Button, Divider, List, Select, Space, Spin, Typography } from "antd";
import useUserDetails from "./hooks/useUserDetails";
import useUserTodo from "./hooks/useUserTodo";
import { CheckCircleTwoTone, MinusSquareTwoTone } from "@ant-design/icons";
const { Option } = Select;
const TodoList = () => {
  const { users, setUsers } = useUserDetails();

  const [userId, setUserId] = useState(null);
  const { todo, setTodo, loading } = useUserTodo(userId);

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (loadingId) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[loadingId] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[loadingId] = false;
        return newLoadings;
      });
      setTodo(
        todo.map((t) => {
          if (t.id === loadingId) {
            return {
              ...t,
              completed: true,
            };
          } else {
            return t;
          }
        })
      );
    }, 2000);
  };

  const doneTask = todo.filter((item) => item.completed).length;
  const totalTask = todo.length;

  const sortedData = todo.slice().sort((a, b) => {
    if (a.completed === b.completed) {
      return 0; // Giữ nguyên vị trí nếu cả hai có cùng giá trị completed
    }
    return a.completed ? 1 : -1; // completed === false trước, completed === true sau
  });

  const onChange = (selectedUserId) => {
    setUserId(selectedUserId);
  };
  const onSearch = (value) => {
    console.log("search:", value);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.name ?? "").includes(input.toLowerCase());
  return (
    <>
      <Divider orientation="left" plain orientationMargin="0">
        Users
      </Divider>
      <Select
        className="w-52"
        showSearch
        placeholder="Select user"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
      >
        {users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>
      <div>
        <Divider orientation="left" orientationMargin="0">
          Tasks
        </Divider>

        <List
          className="overflow-auto"
          style={{ height: "500px" }}
          bordered
          dataSource={sortedData}
          renderItem={(item) => (
            <List.Item className="ant-list-item-no-flex">
              {loading ? (
                <Spin />
              ) : (
                <>
                  <Space>
                    {item.completed ? (
                      <>
                        <CheckCircleTwoTone
                          twoToneColor="#52c41a"
                          className="mr-2"
                        />
                        {item.title}
                      </>
                    ) : (
                      <>
                        <MinusSquareTwoTone
                          twoToneColor="orange"
                          className="mr-2"
                        />
                        {item.title}
                        <Button
                          loading={loadings[item.id]}
                          onClick={() => enterLoading(item.id)}
                        >
                          Mark done
                        </Button>
                      </>
                    )}
                  </Space>
                </>
              )}
            </List.Item>
          )}
        />
        <Typography className="mt-2">
          Done {doneTask}/{totalTask} tasks
        </Typography>
      </div>
    </>
  );
};
export default TodoList;
