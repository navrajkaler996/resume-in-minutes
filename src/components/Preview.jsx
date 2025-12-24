import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import html2pdf from "html2pdf.js";

import Navbar from "./Navbar";
import Accordion from "./Accordian";
import Gauge from "./Gauge";

import {
  calculateResumeScore,
  getColorClasses,
  getSuggestions,
} from "../helper";

import downloadButton from "../assets/downloads.png";
import getTemplate from "../others/getTemplate";
import alarmIcon from "../assets/alarm.png";
import { messages } from "../others/constants";

const MAX_HEIGHT = 1122;

function Preview() {
  const location = useLocation();
  const form = location.state?.form;
  const { templateid } = useParams();
  const [fontSize, setFontSize] = useState(0.875);
  const [fontFamily, setFontFamily] = useState("Times New Roman");

  const [showLimitLine, setShowLimitLine] = useState(false);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const scoreTemp = calculateResumeScore(form);
    const suggestionsTemp = getSuggestions(form);

    if (score === 0) setScore(scoreTemp);
    if (suggestions?.length === 0) setSuggestions(suggestionsTemp);
  }, [form]);

  const downloadPDF = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const element = document.getElementById("resume-content-1");
    html2pdf(element);
    setIsDownloading(false);
  };

  const contentRef = useRef(null);
  const [overflowHeight, setOverflowHeight] = useState(0);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (el) {
        const totalHeight = el.scrollHeight;
        const newOverflowHeight =
          totalHeight > MAX_HEIGHT ? totalHeight - MAX_HEIGHT : 0;
        setOverflowHeight(newOverflowHeight);
      }
    };

    checkOverflow();
    const timeoutId = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timeoutId);
  }, [form, fontSize, fontFamily]);

  const FontSizeController = () => (
    <div
      className="font-size-controller border border-gray-200"
      style={{
        position: "sticky",
        top: 12,
        zIndex: 1000,
        background: "#ffffff",
        padding: "10px 14px",
        borderRadius: "10px",
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "794px",
        marginInline: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        opacity: isDownloading ? 0 : 1,
        pointerEvents: isDownloading ? "none" : "auto",
      }}>
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#374151",
          whiteSpace: "nowrap",
        }}>
        Font size
      </span>

      <button
        onClick={() => setFontSize((prev) => Math.max(0.625, prev - 0.0625))}
        disabled={fontSize <= 0.625}
        style={btnStyle(fontSize <= 0.625)}>
        −
      </button>

      <input
        type="range"
        min="0.625"
        max="1.125"
        step="0.0625"
        value={fontSize}
        onChange={(e) => setFontSize(parseFloat(e.target.value))}
        style={{
          width: "140px",
          height: "4px",
          accentColor: "#9ca3af",
          cursor: "pointer",
        }}
      />

      <button
        onClick={() => setFontSize((prev) => Math.min(1.125, prev + 0.0625))}
        disabled={fontSize >= 1.125}
        style={btnStyle(fontSize >= 1.125)}>
        +
      </button>

      <span
        style={{
          fontSize: "13px",
          color: "#6b7280",
          minWidth: "56px",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}>
        {fontSize.toFixed(3)}rem
      </span>

      <button
        onClick={() => setFontSize(0.875)}
        style={{
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: "13px",
          cursor: "pointer",
          color: "#374151",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
        onMouseLeave={(e) => (e.target.style.background = "#f9fafb")}>
        Reset
      </button>
    </div>
  );

  const FontFamilyController = () => (
    <div
      className="sticky top-0 z-10 mb-3 flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm w-fit"
      style={{
        opacity: isDownloading ? 0 : 1,
        pointerEvents: isDownloading ? "none" : "auto",
      }}>
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Font
      </span>

      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className="rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400">
        <option value="Times New Roman">Times New Roman</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Calibri">Calibri</option>
        <option value="Helvetica">Helvetica</option>
      </select>
    </div>
  );

  const btnStyle = (disabled) => ({
    width: "30px",
    height: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#ffffff",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "18px",
    lineHeight: "1",
    opacity: disabled ? 0.4 : 1,
    transition: "background 0.15s ease",
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-10 justify-center items-center gap-6 w-full">
        <div className="flex-1 max-w-[460px]">
          <FontSizeController />
        </div>
        <div className="flex-1 max-w-[460px]">
          <FontFamilyController />
        </div>
      </div>

      <div className="from-white to-gray-50 flex flex-col md:flex-row justify-between w-full p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="w-full md:w-2/3 min-h-[50vh] bg-custom-gradient p-4 sm:p-6 flex flex-col justify-center items-center font-primary-regular">
          {templateid > 0 &&
            form &&
            getTemplate(
              Number(templateid),
              form,
              overflowHeight,
              contentRef,
              isDownloading,
              fontSize,
              fontFamily
            )}
        </div>

        <div className="w-full md:w-1/3 p-4 sm:p-6 flex flex-col gap-6">
          <div
            className="bg-gradient-to-br rounded-2xl border border-gray-200 p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <div className="flex flex-col items-center">
              <Gauge value={score} />
              <div
                className={`mt-6 flex flex-col justify-center items-center p-6 rounded-2xl w-full ${getColorClasses(
                  score
                )}`}>
                <span className="text-6xl sm:text-7xl font-bold mb-2">
                  {score}%
                </span>
                <p className="text-lg sm:text-xl font-semibold opacity-90">
                  Resume Strength
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {overflowHeight > 0 && (
              <Accordion
                title="Content Overflow - Second Page"
                icon="⚠️"
                iconColor="text-red-500"
                headerBg="bg-gradient-to-r from-red-50 to-red-100"
                borderColor="border-red-400"
                bodyBg="bg-red-50"
                bodyBorder="border-red-200"
                suggestions={[messages.SECOND_PAGE_OVERFLOW_DETAIL]}
              />
            )}

            {suggestions?.critical?.length > 0 && (
              <Accordion
                title="High Priority Fixes"
                icon="❗"
                iconColor="text-red-500"
                headerBg="bg-gradient-to-r from-red-50 to-red-100"
                borderColor="border-red-400"
                bodyBg="bg-red-50"
                bodyBorder="border-red-200"
                suggestions={suggestions.critical}
              />
            )}

            {suggestions?.moderate?.length > 0 && (
              <Accordion
                title="Moderate Priority Fixes"
                icon="❗"
                iconColor="text-yellow-500"
                headerBg="bg-gradient-to-r from-yellow-50 to-yellow-100"
                borderColor="border-yellow-400"
                bodyBg="bg-yellow-50"
                bodyBorder="border-yellow-200"
                suggestions={suggestions.moderate}
              />
            )}

            {suggestions?.low?.length > 0 && (
              <Accordion
                title="Low Priority Fixes"
                icon="❗"
                iconColor="text-green-500"
                headerBg="bg-gradient-to-r from-green-50 to-green-100"
                borderColor="border-green-400"
                bodyBg="bg-green-50"
                bodyBorder="border-green-200"
                suggestions={suggestions.low}
              />
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <button
              onClick={downloadPDF}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-theme-2 to-theme-2/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group">
              <img
                src={downloadButton}
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                alt="Download"
              />
              <span className="text-base">Download PDF</span>
            </button>

            {overflowHeight > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 border border-red-300 rounded-lg">
                <span className="text-red-600 font-semibold text-sm">
                  Second Page Warning
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
