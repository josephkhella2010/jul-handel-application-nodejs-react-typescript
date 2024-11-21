import React from "react";
import { GiButtonFinger } from "react-icons/gi";
interface Props {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (pre: number) => void;
}

export default function PaginationSection({
  setCurrentPage,
  currentPage,
  totalPage
}: Props) {
  let numPage: number[] = [];
  for (let i = 1; i <= totalPage; i++) {
    numPage.push(i);
  }

  return (
    <div className="pagination">
      <div className="btn-container">
        <button
          onClick={() => setCurrentPage((pre: number) => pre - 1)}
          disabled={currentPage === 1}
        >
          prevous
        </button>
        {numPage &&
          numPage.map((item, index) => {
            return (
              <button onClick={() => setCurrentPage(item)} key={index}>
                {item}
              </button>
            );
          })}

        <button
          onClick={() => setCurrentPage((pre: number) => pre + 1)}
          disabled={currentPage === totalPage}
        >
          next
        </button>
      </div>
      <p>
        {currentPage} page of {totalPage} pages
      </p>
    </div>
  );
}
