const BASE_URL = "https://backend-xz4u.onrender.com";
// const BASE_URL = "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const postFormData = async (endpoint, formData) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: data.message };
  }
  return data;
};

const postJSON = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: result.message };
  }
  return result;
};

const putJSON = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: result.message };
  }
  return result;
};

const getData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw { status: response.status, message: result.message };
  }
  return result;
};

export const API = {
  login: (formData) => postFormData("/login", formData),
  signup: (formData) => postFormData("/signup", formData),
  getUsers: () => getData("/user-dashboard"),
  getUser: (id) => getData(`/users/${id}`),
  updateUser: (id, data) => putJSON(`/users/${id}`, data),
  forgotPassword: (email) =>
    fetch(`${BASE_URL}/forgot-password?email=${encodeURIComponent(email)}`, {
      method: "POST",
      headers: getAuthHeaders(),
    }),
  resetPassword: (token, data) =>
    postFormData(`/reset-password/${token}`, data),
};
