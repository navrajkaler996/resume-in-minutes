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

    if (element?.offsetHeight > 1124) setShowLimitLine(true);
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex flex-col justify-center items-center font-primary-regular">
        <div
          id="resume-content"
          className="bg-white p-6 rounded text-gray-900 max-h-[1124px] max-w-[794px] font-arial  shadow-gray-500 border-1 border-gray-300">
          <h1 className="text-4xl font-bold">{form?.name}</h1>
          <p className="font-bold text-lg mb-2">{form?.targetRoles}</p>
          <div className="flex gap-50 mb-2">
            <p>
              <span className="font-bold">Phone:</span> {form?.phone}
            </p>
            <p>
              <span className="font-bold">Email:</span> {form?.email}
            </p>
          </div>

          <p className="mb-2">
            <span className="font-bold">Address:</span> {form?.address},{" "}
            {form?.city}, {form?.province}
          </p>
          <p>{form?.summary} </p>
          <hr className="my-4 border-gray-300" />
          <h2 className="text-3xl font-semibold mt-2 mb-2">Experience</h2>
          {form?.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <span className="text-lg">
                {" "}
                <strong>{exp?.jobTitle}</strong> — {exp?.company},{" "}
                {exp?.location}{" "}
              </span>
              <br />
              <span className=" text-md">
                {" "}
                {exp?.startDate} - {exp?.endDate}
              </span>
              <br />
              <ul className="list-disc list-inside">
                <li className="text-sm mt-1">{exp?.description}</li>
                <li className="text-sm mt-1">{exp?.description}</li>
                <li className="text-sm mt-1">{exp?.description}</li>
              </ul>
            </div>
          ))}

          {/* ✅ Skills Section */}
          <h2 className="text-3xl font-semibold mt-2 mb-2">Skills</h2>
          <p className="text-sm">
            {form?.skills
              ?.split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill, index, arr) => (
                <span key={index}>
                  {skill}
                  {index < arr.length - 1 && (
                    <span className="mx-2">&bull;</span>
                  )}
                </span>
              ))}
          </p>

          <h2 className="text-3xl font-semibold mt-2 mb-2">Education</h2>
          {form?.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
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

{
  /* <div
id="resume-content"
className="bg-white p-6 rounded shadow text-gray-900">
<h1 className="text-4xl font-bold">{form?.name}</h1>
<p className="font-bold text-lg mb-2">{form?.targetRoles}</p>
<div className="flex gap-50 mb-2">
  <p>
    <span className="font-bold">Phone:</span> {form?.phone}
  </p>
  <p>
    <span className="font-bold">Email:</span> {form?.email}
  </p>
</div>

<p className="mb-2">
  <span className="font-bold">Address:</span> {form?.address},{" "}
  {form?.city}, {form?.province}
</p>
<p>{form?.summary} </p>
<hr className="my-4 border-gray-300" />
<h2 className="text-3xl font-semibold mt-2 mb-2">Experience</h2>
{form?.experience.map((exp, idx) => (
  <div key={idx} className="mb-2">
    <span className="text-lg">
      {" "}
      <strong>{exp?.jobTitle}</strong> — {exp?.company}, {exp?.location}{" "}
    </span>
    <br />
    <span className=" text-md">
      {" "}
      {exp?.startDate} - {exp?.endDate}
    </span>
    <br />
    <ul className="list-disc list-inside">
      <li className="text-sm mt-1">{exp?.description}</li>
      <li className="text-sm mt-1">{exp?.description}</li>
      <li className="text-sm mt-1">{exp?.description}</li>
    </ul>
  </div>
))}


<h2 className="text-3xl font-semibold mt-2 mb-2">Skills</h2>
<p className="text-sm">
  {form?.skills
    ?.split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .map((skill, index, arr) => (
      <span key={index}>
        {skill}
        {index < arr.length - 1 && <span className="mx-2">&bull;</span>}
      </span>
    ))}
</p>

<h2 className="text-3xl font-semibold mt-2 mb-2">Education</h2>
{form?.education.map((edu, idx) => (
  <div key={idx} className="mb-2">
    <strong>{edu?.degree}</strong> — {edu?.school}
    <br />
    {edu?.field}, {edu?.start} - {edu?.end}
  </div>
))}
</div> */
}
