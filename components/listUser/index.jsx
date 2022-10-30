import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./transfer.module.css";

const ListUser = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

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

  const handleNavigate = (id) => {
    router.push(`/transfer/${id}`);
  };

  return (
    <>
      <ul className="px-0 mt-5">
        {currentItems.map((elem) => {
          return (
            <>
              <li
                className="d-flex py-3 px-3 justify-content-between rounded mb-5 shadow"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate(elem.id)}
              >
                <div className="d-flex gap-3 align-items-center">
                  <div className={styles.containerImage}>
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
                      {elem.firstName ? elem.firstName : "No first Name"}{" "}
                      {elem.lastName ? elem.lastName : "No last name"}
                    </h5>
                    {elem.noTelp ? elem.noTelp : "dont have phonenumber"}
                  </div>
                </div>
              </li>
            </>
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

export default ListUser;
