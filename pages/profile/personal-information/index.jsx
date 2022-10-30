import Layout from "layout";
import React from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "store/actions/user";
import Link from "next/link";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById(Cookies.get("userId")));
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-12 bg-white shadow rounded mt-4">
          <h5>Personal Information</h5>
          <p>
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </p>
          <div className="shadow p-3 mb-2">
            <p>First Name</p>
            <p>{user.data.firstName}</p>
          </div>
          <div className="shadow p-3 mb-2">
            <p>Last Name</p>
            <p>{user.data.lastName}</p>
          </div>
          <div className="shadow p-3 mb-2">
            <p>Verified E-mail</p>
            <p>{user.data.email}</p>
          </div>
          <div className="shadow p-3 mb-2 d-flex justify-content-between">
            <div>
              <p>Phone Number</p>
              <p>{user.data.noTelp}</p>
            </div>
            <div className="d-flex align-items-center">
              <Link href="/profile/phone-number">
                <a href="" style={{ textDecoration: "none" }}>
                  Manage
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalInfo;
