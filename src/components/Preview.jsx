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

const MAX_HEIGHT = 1122; // px

function Preview() {
  const location = useLocation();
  const form = location.state?.form;
  const { templateid } = useParams();

  const [showLimitLine, setShowLimitLine] = useState(false);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const scoreTemp = calculateResumeScore(form);
    const suggestionsTemp = getSuggestions(form);

    if (score === 0) setScore(scoreTemp);
    if (suggestions?.length === 0) setSuggestions(suggestionsTemp);
    const element = document.getElementById("resume-content");
    console.log(element.scrollHeight);
  }, [form]);

  //Function to download PDF
  const downloadPDF = async () => {
    setIsDownloading(true);

    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms is usually enough
    const element = document.getElementById("resume-content");
    html2pdf(element);
    setIsDownloading(false);
  };

  const contentRef = useRef(null);
  const [overflowHeight, setOverflowHeight] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (el) {
      const totalHeight = el.scrollHeight;
      setOverflowHeight(
        totalHeight > MAX_HEIGHT ? totalHeight - MAX_HEIGHT : 0
      );
    }
  }, [form]);

  return (
    <>
      <Navbar />
      <div className="flex justify-between w-full p-6 mt-10">
        <div className=" w-2/3min-h-screen bg-custom-gradient  p-6  flex flex-col justify-center items-center font-primary-regular">
          {templateid > 0 &&
            form &&
            getTemplate(
              Number(templateid),
              form,
              overflowHeight,
              contentRef,
              isDownloading
            )}
        </div>

        <div className="flex flex-col items-center relative w-1/3 p-6">
          <Gauge value={score} />
          <div
            className={`mt-6 flex flex-col justify-center items-center p-6 rounded-xl font-primary-regular ${getColorClasses(
              score
            )}`}>
            <span className="text-7xl font-primary-regular mb-5">{score}%</span>
            <p className="text-2xl font-primary-regular">Resume strength</p>
          </div>
          {/* 
          <div className="overflow-warning w-full pt-2 pb-2 text-red-900 text-center  rounded-xl flex items-center ">
            <img src={alarmIcon} className=" text-xl w-auto h-6 ml-5 mr-2" />
            <p className="font-primary-regular">
              {" "}
              Your resume is crossing into the second page!{" "}
            </p>
          </div> */}

          {overflowHeight > 0 && (
            <Accordion
              title={messages.SECOND_PAGE_OVERFLOW}
              icon="❗"
              iconColor="text-red-500"
              headerBg="bg-red-600/30 "
              borderColor="border-red-400"
              bodyBg="bg-red-100"
              bodyBorder="border-red-200"
              suggestions={[messages.SECOND_PAGE_OVERFLOW_DETAIL]}
            />
          )}

          {suggestions?.critical?.length > 0 && (
            <Accordion
              title="High priority fixes"
              icon="❗"
              iconColor="text-red-500"
              headerBg="bg-white"
              borderColor="border-red-400"
              bodyBg="bg-red-100"
              bodyBorder="border-red-200"
              suggestions={suggestions.critical}
            />
          )}
          {suggestions?.moderate?.length > 0 && (
            <Accordion
              title="Moderate priority fixes"
              icon="❗"
              iconColor="text-yellow-500"
              headerBg="bg-white"
              borderColor="border-yellow-400"
              bodyBg="bg-yellow-100"
              bodyBorder="border-yellow-200"
              suggestions={suggestions.moderate}
            />
          )}
          {suggestions?.low?.length > 0 && (
            <Accordion
              title="Low priority fixes"
              icon="❗"
              iconColor="text-green-500"
              headerBg="bg-white"
              borderColor="border-green-400"
              bodyBg="bg-green-100"
              bodyBorder="border-green-200"
              suggestions={suggestions.low}
            />
          )}

          <div
            className="flex items-center mt-10 pr-6 pl-6 pt-2 pb-2
                    text-theme-2 border-1 border-theme-2 rounded-md
                    bg-transparent
                    hover:bg-theme-1 hover:text-white
                    cursor-pointer transition
                    self-end
                  "
            onClick={downloadPDF}>
            <img src={downloadButton} className="w- h-5" alt="Download" />
            <span className="font-primary-regular ml-4 text-sm">
              Download PDF
            </span>
          </div>
          <span className="absolute bottom-5 rounded-xl pt-1 pb-1 pr-3 pl-3 bg-red-600/30 font-primary-regular left-0">
            {" "}
            Second page{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default Preview;
