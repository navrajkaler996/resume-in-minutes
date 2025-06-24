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

      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex justify-center font-primary-regular">
        <div className="max-w-4xl mt-10 text-center">
          {!started && (
            <>
              <h1 className="text-7xl font-bold text-gray-900 mb-4">
                Build a Stunning Resume in Minutes
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Use our AI-powered tool to generate professional resumes fast —
                just answer a few simple questions. No design skills needed.
              </p>

              <div className="mt-15 mb-15 border-b-1 border-gray-400"> </div>
              {/* ✅ Benefit List */}
              <ul className="text-left text-gray-800 text-lg font-medium max-w-md mx-auto space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  Completely free, easy-to-use, no hidden charges
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  Powered by AI to help write and improve your content
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">✓</span>
                  Export your resume as PDF instantly
                </li>
              </ul>

              <Button
                className="mt-4 px-20 py-2 border-1 border-gray-400"
                onClick={() => navigate("/form")}>
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
