import Navbar from "../components/Navbar";
import Template1 from "../assets/templates/template-1.png";
import Template2 from "../assets/templates/template-2.png";
import Template3 from "../assets/templates/template-3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TemplateScreen = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (id) => {
    setSelectedTemplate(id);
    navigate(`/form/${id}`);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 py-14 font-primary-regular flex flex-col items-center">
        <div className="absolute top-5 left-10 max-w-7xl mx-auto flex items-center">
          <span className="text-2xl font-extrabold tracking-wide text-gray-900">
            Resume <span className="text-yellow-500">In Minutes</span>
          </span>
        </div>
        <div className="flex flex-col items-center w-full max-w-6xl mt-10">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-900 text-center mb-2">
            Choose a Resume Template
          </h2>

          <p className="text-gray-600 text-sm sm:text-base text-center mb-12 max-w-xl">
            Pick a clean, professional layout designed for recruiters and ATS
            systems.
          </p>

          {/* Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-18 ">
            {[
              { id: 1, img: Template1 },
              { id: 2, img: Template2 },
              { id: 3, img: Template3 },
            ].map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className={`group cursor-pointer rounded-xl overflow-hidden bg-white transition-transform duration-500 ease-in-out
    ${
      selectedTemplate === template.id
        ? "ring-2 ring-yellow-400 shadow-lg scale-105"
        : "ring-1 ring-gray-200 hover:ring-yellow-400/50 hover:shadow-md hover:scale-125"
    }
  `}
                style={{ width: "260px" }}>
                {/* Image */}
                <div className="relative bg-gray-100 overflow-hidden rounded-t-lg">
                  <img
                    src={template.img}
                    alt={`Template ${template.id} Preview`}
                    className="w-full h-[360px] object-cover"
                  />
                </div>

                {/* Footer */}
                <div className="px-4 py-3 text-center border-t border-gray-200 bg-gray-50">
                  <p className="text-sm font-medium text-gray-800">
                    Template {template.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateScreen;
