import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import PaginationSection from "./PaginationSection";
interface ProductType {
  name: string;
  price: number;
  ind: number;
  url: string;
  imgs: string[];
}
export default function ProductList() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  async function getData(id: number): Promise<void> {
    try {
      const Apidata = await axios(` http://localhost:5000/products/page/${id}`);
      console.log(Apidata.data);
      setProductList(Apidata.data.products);
      setTotalPage(Apidata.data.totalPages);
    } catch (error) {
      console.log("error" + error);
    }
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  return (
    <>
      <div className="card-container">
        {productList &&
          productList.map((item, index) => {
            return <ProductItems key={index} item={item} index={index} />;
          })}
      </div>
      <PaginationSection
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPage={totalPage}
      />
    </>
  );
}
