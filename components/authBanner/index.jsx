import React from "react";
import Image from "next/image";
import styles from "./authBanner.module.css";

const AuthBanner = () => {
  return (
    <>
      <Image
        src="/wave2.png"
        className={styles.wave}
        layout="fill"
        objectFit=""
      />
      <h3 className="p-4 text-white" style={{ fontWeight: 700 }}>
        FazzPay
      </h3>
      <div className={styles.containerImage} style={{}}>
        <Image src="/phones.png" layout="responsive" width={100} height={100} />
      </div>
      <div className={`${styles.contentContainer} w-50`}>
        <h5>App that Covering Banking Needs.</h5>
        <p>
          FazzPay is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in FazzPay everyday with worldwide users
          coverage.
        </p>
      </div>
    </>
  );
};

export default AuthBanner;
