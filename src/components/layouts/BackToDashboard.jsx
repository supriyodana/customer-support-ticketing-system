import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';



const BackToDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className=" sticky top-0 border-0 bg-gray-100 dark:bg-gray-900">
    <button
      onClick={() => navigate("/")}
      className={`cursor-pointer text-sm lg:text-base hover:text-blue-500 px-4 sm:px-6 md:px-8 lg:px-10 py-2 border-none bg-transparent  mt-3 mb-3  `}   
    >
      <LeftOutlined className="mr-2" /> Back to dashboard  
    </button>
    </div>
  );
};

export default BackToDashboard;


