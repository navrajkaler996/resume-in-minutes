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

      <div className="min-h-screen w-full bg-custom-gradient p-6 font-primary flex font-primary-regular">
        <div className="flex flex-col items-center mt-10 w-full">
          <h2 className="text-2xl font-semibold mb-6 mt-3 tracking-wider text-center">
            Choose a template
          </h2>

          <div className="flex gap-10 mt-6">
            <img
              id="1"
              src={Template1}
              className="w-70 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-150"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
            />
            <img
              id="2"
              src={Template2}
              className="w-70 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-150"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
            />
            <img
              id="3"
              src={Template3}
              className="w-70 h-auto border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-150"
              onClick={(e) => navigate(`/form/${e.target.id}`)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateScreen;
