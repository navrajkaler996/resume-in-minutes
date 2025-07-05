import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

function Preview() {
  const location = useLocation();
  const form = location.state?.form;

  const [showLimitLine, setShowLimitLine] = useState(false);
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const scoreTemp = calculateResumeScore(form);
    const suggestionsTemp = getSuggestions(form);

    if (score === 0) setScore(scoreTemp);
    if (suggestions?.length === 0) setSuggestions(suggestionsTemp);
  }, [form]);

  //Function to download PDF
  const downloadPDF = async () => {
    const element = document.getElementById("resume-content");
    console.log(html2pdf(element));
    html2pdf(element);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-between w-full p-6 mt-10">
        <div className=" w-2/3min-h-screen bg-custom-gradient  p-6  flex flex-col justify-center items-center font-primary-regular">
          <div id="resume-content" className="resume-content">
            <h1>{form?.name}</h1>
            <p className="target-roles">{form?.role}</p>
            <div className="contact-row">
              <p>
                <span className="font-bold">Phone:</span> {form?.phone}
              </p>
              <p>
                <span className="font-bold">Email:</span> {form?.email}
              </p>
            </div>
            <p className="address">
              <span className="font-bold">Address:</span> {form?.address},{" "}
              {form?.city}, {form?.province}
            </p>

            <p className="summary">{form?.summary}</p>
            {/* ... */}
            <hr />
            <h2>Experience</h2>
            {form?.experience.map((exp, idx) => (
              <div key={idx} className="experience-entry">
                <span className="job-title">{exp?.jobTitle}</span> —{" "}
                <span className="company-location">
                  {exp?.company}, {exp?.location}{" "}
                </span>
                <br />
                <span className="date-range">
                  {exp?.startDate} - {exp?.endDate}
                </span>
                <ul>
                  {exp.keyPoints?.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
            <h2>Skills</h2>
            <p className="skills-section">
              {form?.skills
                ?.split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill, index, arr) => (
                  <span key={index}>
                    {skill}
                    {index < arr.length - 1 && <span> &nbsp;&bull;&nbsp;</span>}
                  </span>
                ))}
            </p>
            {form.projects && form.projects.length > 0 && (
              <>
                <h2>Projects</h2>
                {form.projects.map((proj, idx) => (
                  <div key={idx} className="project-entry">
                    <span className="project-title">{proj?.title}</span>
                    {proj?.link && (
                      <>
                        {" "}
                        —{" "}
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {proj.link}
                        </a>
                      </>
                    )}
                    <br />
                    <span className="project-tech">{proj?.technologies}</span>
                    <ul>
                      {proj?.keyPoints?.length > 0
                        ? proj.keyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))
                        : proj?.description && <li>{proj.description}</li>}
                    </ul>
                  </div>
                ))}
              </>
            )}

            <h2>Education</h2>
            {form?.education.map((edu, idx) => (
              <div key={idx} className="education-entry">
                <strong>{edu?.degree}</strong> — {edu?.school}
                <br />
                {edu?.field}, {edu?.start} - {edu?.end}
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </>
  );
}

export default Preview;
