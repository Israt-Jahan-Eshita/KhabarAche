import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ img, title, value, onClick }) => {
  return (
    <div className="lg:w-full bg-white p-3 rounded-lg shadow-lg cursor-pointer border border-white/20">
      {/* White Border Around Each Image */}
      <div
        onClick={onClick}
        className="border-4 border-white rounded-xl overflow-hidden"
      >
        <img className="rounded-xl w-full" src={img} alt={title} />
      </div>

      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl text-black">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-white mt-2">
            This is a delicious meal available for order. Enjoy the best taste
            with fresh ingredients!
          </p>
          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="flex gap-2">
              <button className="px-3 text-sm border-2 border-white bg-transparent hover:text-orange-500 transition-all rounded-lg">
                Like
              </button>
              <button className="px-3 text-sm border-2 border-white bg-transparent hover:text-orange-500 transition-all rounded-lg">
                Comment
              </button>
            </div>
            <span className="border-2 border-white bg-white hover:text-orange-500 transition-all cursor-pointer p-2 rounded-lg">
              <FaShoppingCart size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
