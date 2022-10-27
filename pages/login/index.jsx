import React, { useState } from "react";
import axiosClient from "util/axios";

import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/login", form);
      // menjalankan get user by id dan menyimpan datanya ke redux
      Cookies.set("token", result.data.data.token);
      Cookies.set("userId", result.data.data.id);
      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/home");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container text-center">
      <div className="mt-2">
        <form className="card p-5">
          <h1>Login</h1>
          <hr />
          <input
            type="email"
            className="form-control my-2"
            name="email"
            placeholder="Input email ..."
            onChange={handleChangeText}
          />
          <input
            type="password"
            className="form-control my-2"
            name="password"
            placeholder="Input password ..."
            onChange={handleChangeText}
          />
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
