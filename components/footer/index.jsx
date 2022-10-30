import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className="py-3" style={{ background: "#6379F4" }}>
      <div className={`container pt-2 ${styles.containerFooter}`}>
        <p className="">2020 FazzPay. All right reserved.</p>
        <div className=" d-flex gap-4">
          <p>+62 5637 8882 9901</p>
          <p>contact@fazzpay.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
