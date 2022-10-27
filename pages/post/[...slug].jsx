import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();
  console.log(router);
  return <div>Post</div>;
};

export default Post;
