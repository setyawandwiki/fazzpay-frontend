import { useRouter } from "next/router";
import React from "react";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <div>Detail</div>;
};

export default Detail;
