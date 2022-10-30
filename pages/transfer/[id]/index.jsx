import Layout from "layout";
import Image from "next/image";
import React from "react";
import styles from "./transferUser.module.css";
import numeral from "numeral";
import { useState } from "react";
import axiosServer from "../../../util/axiosServer";
import Cookies from "next-cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const InputAmount = (props) => {
  const [data, setData] = useState({ value: "", notes: "" });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const formatValue = (param) => {
    if (!param) {
      return "";
    }
    return numeral(param).format("0,0");
  };

  const handleNavigate = () => {
    if (Number(props.myData.balance) < Number(data.value.replace(",", ""))) {
      toast.error("balance lower than transfer!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      router.push(
        {
          pathname: `/transfer/${router.query.id}/confirmation`,
          query: {
            amount: data.value.replace(",", ""),
            notes: data.notes,
            receiverId: router.query.id,
            balance: props.myData.balance,
            image: props.detailUser.image,
            firstName: props.detailUser.firstName,
            lastName: props.detailUser.lastName,
            noTelp: props.detailUser.noTelp,
          },
        },
        `/transfer/${router.query.id}/confirmation`
      );
    }
  };

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="row mt-4 bg-white shadow p-5">
        <div className="col-12">
          <h5>Transfer Money</h5>
          <div className="d-flex gap-3">
            <div className={styles.containerUser}>
              <Image
                alt="user"
                src={
                  props.detailUser.image
                    ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${props.detailUser.image}`
                    : "/no-profile.png"
                }
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div>
              <p>
                {props.detailUser.firstName
                  ? props.detailUser.firstName
                  : "No first name"}{" "}
                {props.detailUser.lastName
                  ? props.detailUser.lastName
                  : "No lastname"}
              </p>
              <p>{props.detailUser.noTelp}</p>
            </div>
          </div>
          <div className={`${styles.containerInput}`}>
            <p>
              Type the amount you want to transfer and then press continue to
              the next steps.
            </p>
            <div
              className={`d-flex justify-content-center flex-column align-items-center ${styles.containerInput2}`}
            >
              <div className="d-flex align-items-center">
                {data.value.length > 0 && (
                  <h1 className="" style={{ fontSize: "4.5rem" }}>
                    Rp
                  </h1>
                )}
                <input
                  type="text"
                  className=""
                  name="value"
                  value={formatValue(data.value)}
                  onChange={handleChange}
                  placeholder="0.00"
                  style={{ fontSize: "5rem" }}
                />
              </div>
              <p className="pt-5">
                Rp. {props.myData.balance ? props.myData.balance : 0} Available
              </p>
              <div
                className="d-flex pt-5"
                style={{ borderBottom: "1px solid black" }}
              >
                <i class="bi bi-pen m-2"></i>
                <input
                  type="text"
                  name="notes"
                  onChange={handleChange}
                  value={data.notes}
                  placeholder="notes"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleNavigate}>
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default InputAmount;

export const getServerSideProps = async (context) => {
  const token = Cookies(context);
  const data = await axiosServer.get(`user/profile/${context.query.id}`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const myData = await axiosServer.get(`user/profile/${token.userId}`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const userId = Cookies(context);

  return {
    props: {
      detailUser: data.data.data,
      myData: myData.data.data,
      userId: userId.userId,
    },
  };
};
