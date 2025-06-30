import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

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
