import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./listHistory.module.css";

const ListHistory = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  console.log(data);
  const router = useRouter();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul>
        {currentItems.map((elem) => {
          return (
            <li key={elem.id} className="d-flex justify-content-between mb-5">
              <div key={elem.id} className="d-flex gap-3 align-items-center">
                <div key={elem.id} className={styles.containerImage}>
                  <Image
                    src={
                      elem.image
                        ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${elem.image}`
                        : `/no-profile.png`
                    }
                    Layout="responsive"
                    width={100}
                    height={100}
                    alt={elem.firstName}
                  />
                </div>
                <div>
                  <h5>
                    {elem.firstName ? elem.firstName : ""}{" "}
                    {elem.lastName ? elem.lastName : ""}
                  </h5>
                  <p className="text-secondary">{elem.type}</p>
                </div>
              </div>
              <div
                className={`price ${
                  elem.type === "send" ? "text-danger" : "text-success"
                }`}
              >
                <p>
                  {elem.type === "send" ? "-" : "+"} Rp {elem.amount}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default ListHistory;
