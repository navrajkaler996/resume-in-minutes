import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-custom-gradient p-4 sm:p-6 font-primary-regular flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl text-center">
          {!started && (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                Build a Stunning Resume in Minutes
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Use our AI-powered tool to generate professional resumes fast —
                just answer a few simple questions. No design skills needed.
              </p>
              <div className="my-8 sm:my-10 border-b border-gray-400"></div>
              <ul className="text-left text-gray-800 text-base sm:text-lg font-medium max-w-full sm:max-w-md mx-auto space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-lg sm:text-xl">
                    ✓
                  </span>
                  Completely free, easy-to-use, no hidden charges
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-lg sm:text-xl">
                    ✓
                  </span>
                  Powered by AI to help write and improve your content
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-lg sm:text-xl">
                    ✓
                  </span>
                  Export your resume as PDF instantly
                </li>
              </ul>
              <Button
                className="mt-4 px-8 sm:px-20 py-2 border border-gray-400"
                onClick={() => navigate("/template")}>
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
