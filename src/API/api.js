import axios from "axios";
const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6508e0a9-705e-4d13-8148-db4f5ed70995",
  },
});

export const authApi = {
  login: async function (data) {
    const res = await instance.post("auth/login", { ...data });
    return res;
  },
  logOut: async function () {
    const res = await instance.delete("auth/login");
    return res;
  },
  authMe: async function () {
    const res = await instance.get("auth/me");
    return res.data;
  },
};

export const profileApi = {
  getProfile: async function (userId) {
    const res = await instance.get(`profile/${userId}`);
    return res;
  },
  putProfile: async function (profile) {
    const res = await instance.put(`profile`, profile);
    return res;
  },

  getProfileStatus: async function (userId) {
    const res = await instance.get(`profile/status/${userId}`);
    return res;
  },
  putProfileStatus: async function (status) {
    const res = await instance.put(`profile/status`, { status });
    return res;
  },

  putProfilePhoto: async function (photo) {
    const formData = new FormData();
    formData.append("image", photo);
    const res = await instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

export const usersApi = {
  getUsers: async function (count = 10, page = 1, isFriend = "", term = "") {
    const res = await instance.get(
      `/users?count=${count}&page=${page}&friend=${isFriend}&term=${term}`
    );
    return res.data;
  },
};

export const followApi = {
  postFollow: async function (userId) {
    const res = await instance.post(`follow/${userId}`);
    return res;
  },
  deleteFollow: async function (userId) {
    const res = await instance.delete(`follow/${userId}`);
    return res;
  },
  getFollow: async function (userId) {
    const res = await instance.get(`follow/${userId}`);
    return res.data;
  },
};


export const newsApi = {
  getNews:async (page=1, pageSize=1)=>{
  const res = await axios.get(`https://my-json-server.typicode.com/Sdredinovich/news-server/news?_page=${page}&_limit=${pageSize}`);
  return res;
  }
}
