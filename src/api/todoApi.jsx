import axiosClient from "./axiosClientApi";

const todoApi = {
  get(id) {
    const url = `/users/${id}/todos`;
    return axiosClient.get(url);
  },
};

export default todoApi;
