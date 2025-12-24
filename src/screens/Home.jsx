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

      <div className="relative min-h-screen bg-gray-50 px-4 sm:px-6 font-primary-regular flex items-center justify-center overflow-hidden">
        {/* Subtle gold background accents */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          {!started && (
            <>
              {/* Eyebrow */}
              <p className="text-sm uppercase tracking-widest text-yellow-600 mb-4">
                AI Resume Builder
              </p>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Build a{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
                  Stunning Resume
                </span>{" "}
                in Minutes
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                Generate a clean, professional resume using AI. Answer a few
                simple questions — we’ll handle the writing and layout.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  className="px-10 py-3 text-slate-900 bg-gradient-to-r from-yellow-400 to-yellow-500 border-none shadow-md hover:shadow-lg transition"
                  onClick={() => navigate("/template")}>
                  Get Started Free
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 justify-center mb-8">
                <span className="w-12 h-px bg-gray-300"></span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Why Choose Us
                </span>
                <span className="w-12 h-px bg-gray-300"></span>
              </div>

              {/* Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                {[
                  "Completely free, no hidden charges",
                  "AI-powered writing & optimization",
                  "Instant PDF export",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <span className="text-yellow-500 text-xl">✓</span>
                    <p className="text-gray-700 text-sm sm:text-base">{text}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
