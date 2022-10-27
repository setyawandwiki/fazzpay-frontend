import Layout from "layout";
import Image from "next/image";
import React from "react";

const HandleImage = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1>HandleImage without next image</h1>
        <div style={{ width: 300, height: 300, border: "1px solid black" }}>
          <img src="/gambar3.jpg" alt="" style={{ width: 400, height: 300 }} />
        </div>
        <br />
        <div style={{ width: 300, height: 300, border: "1px solid black" }}>
          <h1>handleimage with next image</h1>
          <Image
            src="/gambar3.jpg"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HandleImage;
