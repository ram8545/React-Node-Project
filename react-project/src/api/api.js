// const BASE_URL = "https://backend-xz4u.onrender.com";
const BASE_URL = "http://localhost:8000";

const postFormData = async (endpoint, formData) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

const putJSON = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

const getData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return response.json();
};

export const API = {
  login: (formData) => postFormData("/login", formData),
  signup: (formData) => postFormData("/signup", formData),
  getUsers: () => getData("/dashboard"),
  getUser: (id) => getData(`/users/${id}`),
  updateUser: (id, data) => putJSON(`/users/${id}`, data),
};
