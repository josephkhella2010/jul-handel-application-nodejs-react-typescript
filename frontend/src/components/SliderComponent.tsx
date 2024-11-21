import React, { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface ProductType {
  imgs?: string[];
  name: string;
}
export default function SliderComponent({ imgs = [], name }: ProductType) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  function handleprev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(imgs.length - 1);
    }
  }
  function handlenext() {
    if (currentIndex < imgs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  return (
    <div className="img-container">
      <div className="slide-up-conatainer">
        <SlArrowLeft className="icon icon-left" onClick={handleprev} />
        <SlArrowRight className="icon icon-right" onClick={handlenext} />
        {imgs &&
          imgs.map((item, index) => {
            return (
              <img
                src={item}
                alt={name}
                key={index}
                className={
                  index === currentIndex ? "main-slid opacity" : "main-slid"
                }
              />
            );
          })}
      </div>
      <div className="slide-container">
        {imgs &&
          imgs.map((item, index) => {
            return (
              <img
                src={item}
                alt={name}
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={
                  index === currentIndex ? "thumbnail opacity" : "thumbnail"
                }
              />
            );
          })}
      </div>
    </div>
  );
}
