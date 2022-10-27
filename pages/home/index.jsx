import React from "react";

import Layout from "layout/index";
import axiosClient from "util/axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axiosClient.get(
        "/user?page=1&limit=50&search=&sort=firstName ASC"
      );
      setData(result.data.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div>Home</div>
        <p>{process.env.URL_BACKEND}</p>
        {data.map((elem) => (
          <div className="card" key={elem.id}>
            <h1>
              {elem.firstName} {elem.lastName}
            </h1>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Home;
