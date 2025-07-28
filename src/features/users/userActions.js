import axios from "axios";

// fetch users
export const fetchUsers = async () => {
  const response = await fetch('https://reqres.in/api/users', {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data;
};

//store users
export const storeUser = async ({ username, email, password }) => {
  const res = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create user");
  }

  return data;
};

//update users
export const updateUser = async ({ id, username, email, password }) => {
  const res = await axios.put(
    `https://reqres.in/api/users/${id}`,
    { username: username, email: email, password: password },
    {
      headers: { "x-api-key": "reqres-free-v1" },
    }
  );
  return res.data;
};

//delete users
export const deleteUser = async (id) => {
  const res = await axios.delete(
    `https://reqres.in/api/users/${id}`,
    {
      headers: { "x-api-key": "reqres-free-v1" },
    }
  ).then(res => {
    if (res.status === 204) {
      console.log(res)
    }
  })

  return res.data;
};
