import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Gauge from "./Gauge";
import expandIcon from "../assets/expand.png";

function Preview() {
  const location = useLocation();
  const form = location.state?.form;

  const [showLimitLine, setShowLimitLine] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById("resume-content");
    console.log(html2pdf(element));
    html2pdf(element);
  };

  useEffect(() => {
    const element = document.getElementById("resume-content");

    // if (element?.offsetHeight > 1124) setShowLimitLine(true);
  });
  return (
    <>
      <Navbar />
      <div className="bg-primary-1 flex flex-col items-center justify-center relative">
        {" "}
        <Gauge
          value={70}
          pointerColor="red"
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
        <div className="flex justify-around align-middle w-2xl">
          <div>
            <img
              src={expandIcon}
              className="w-10 h-10 hover:cursor-pointer"
              alt="Expand"
            />
          </div>
          <div className="text-center">
            <p className="text-5xl font-primary-regular">45%</p>
            <p className="font-primary-regular">Resume strength</p>
          </div>
          <div>
            <p className="text-4xl text-red-600">B-</p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex flex-col justify-center items-center font-primary-regular">
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
              <h2 className="text-[26px] font-semibold mt-2 mb-2">Projects</h2>
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
                        rel="noopener noreferrer"
                        className="text-blue-600 underline">
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

        <button
          onClick={downloadPDF}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Download PDF
        </button>
      </div>
    </>
  );
}

export default Preview;
