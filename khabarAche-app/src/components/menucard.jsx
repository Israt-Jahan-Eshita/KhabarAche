import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ img, title, value, description, onClick }) => {
  return (
    <div className="lg:w-full bg-white p-3 rounded-lg shadow-lg cursor-pointer border border-gray-200 flex flex-col h-full max-h-[450px]">
      <div onClick={onClick} className="border-4 border-gray-300 rounded-xl overflow-hidden">
        <img
          className="rounded-xl w-full h-48 object-cover"
          src={img ? img : ""}
          alt={title}
          onError={(e) => (e.target.src = "")}
        />
      </div>
      <div className="p-2 mt-5 flex flex-col flex-grow">
        <div className="flex flex-row justify-between gap-x-4">
          <h3 className="font-semibold text-xl">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex-grow">
          <p className="text-white mt-2 text-ellipsis overflow-hidden line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4">
          <button className="px-3 text-sm border-2 border-gray-400 bg-transparent hover:text-orange-500 transition-all rounded-lg">
            Like
          </button>
          <button className="px-3 text-sm border-2 border-gray-400 bg-transparent hover:text-orange-500 transition-all rounded-lg">
            Comment
          </button>
          <span className="border-2 border-gray-400  hover:text-orange-500 transition-all cursor-pointer p-2 rounded-lg">
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
