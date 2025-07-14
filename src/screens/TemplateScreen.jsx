import Navbar from "../components/Navbar";
import Template1 from "../assets/templates/template-1.png";
import Template2 from "../assets/templates/template-2.png";
import Template3 from "../assets/templates/template-3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TemplateScreen = () => {
  const navigate = useNavigate();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-custom-gradient p-4 sm:p-6 font-primary-regular flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-5xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 mt-4 sm:mt-6 tracking-wide text-center">
            Choose a Template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <img
              id="1"
              src={Template1}
              className="w-full sm:w-64 md:w-80 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
              alt="Template 1 Preview"
            />
            <img
              id="2"
              src={Template2}
              className="w-full sm:w-64 md:w-80 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
              alt="Template 2 Preview"
            />
            <img
              id="3"
              src={Template3}
              className="w-full sm:w-64 md:w-80 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-105 sm:hover:scale-110"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
              alt="Template 3 Preview"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateScreen;
