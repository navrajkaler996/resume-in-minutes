import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Textarea from "./TextArea";
import Preview from "./Preview";
import { useNavigate, useParams } from "react-router-dom";
import {
  generateExperience,
  generateProjectKeyPoints,
  generateSummary,
} from "../services/openAiService";

import CircularProgress from "@mui/material/CircularProgress";

const loadingMessages = [
  "Creating template...",
  "Connecting with AI...",
  "Generating your resume...",
  "Finalizing details...",
];

function Form({ step, setStep }) {
  const navigate = useNavigate();
  const { templateid } = useParams();

  const [form, setForm] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    linkedin: "",
    website: "",
    education: [
      {
        school: "",
        degree: "",
        field: "",
        start: "",
        end: "",
      },
    ],
    experience: [
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        keyPoints: "",
        description: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    targetRoles: "",
    skills: "",
    summary: "",
  });

  const [errors, setErrors] = useState({});

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (step !== 6 && step !== -1) {
      setMessageIndex(0); // Reset when not loading
      return;
    }
    if (messageIndex === loadingMessages.length - 1) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [step, messageIndex]);

  useEffect(() => {
    async function fetchExperience() {
      if (step === 6 && form?.experience?.length > 0) {
        const keyPoints = await generateExperience(form.experience);
        console.log("----", keyPoints);
        // // Example of updating experience with keyPoints:
        // const experienceTemp = form.experience.map((exp, idx) =>
        //   idx === 0
        //     ? { ...exp, keyPoints } // or keyPoints: keyPointsArray if it's an array
        //     : exp
        // );

        const experienceTemp = form.experience.map((exp, i) => {
          return {
            ...exp,
            keyPoints: keyPoints[i],
          };
        });

        // Deep clone if needed

        let newSummary;

        if (form?.summary?.length > 0) {
          newSummary = await generateSummary(
            form?.summary,
            form?.targetRoles,
            form?.skills
          );
        }

        let newProjects;
        if (form.projects?.length > 0) {
          const projectKeyPoints = await generateProjectKeyPoints(
            form.projects
          );

          newProjects = form.projects.map((proj, i) => ({
            ...proj,
            keyPoints: projectKeyPoints[i],
          }));
        }

        const newForm = structuredClone(form);
        newForm.experience = experienceTemp;
        newForm.summary = newSummary;
        newForm.projects = newProjects;

        setStep(-1);

        navigate(`/preview/${templateid}`, {
          state: {
            form: newForm,
          },
        });
      }
    }

    fetchExperience();
  }, [step]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (index, e) => {
    const updated = [...form.education];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, education: updated });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...form.education,
        { school: "", degree: "", field: "", start: "", end: "" },
      ],
    });
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...form.experience];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, experience: updated });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const handleRoleChange = (index, e) => {
    const updatedRoles = [...form.targetRoles];
    updatedRoles[index] = e.target.value;
    setForm({ ...form, targetRoles: updatedRoles });
  };

  const addRole = () => {
    setForm({ ...form, targetRoles: [...form.targetRoles, ""] });
  };
  const handleProjectChange = (index, e) => {
    const updated = [...form.projects];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, projects: updated });
  };

  const addProject = () => {
    setForm({
      ...form,
      projects: [
        ...form.projects,
        { title: "", description: "", technologies: "", link: "" },
      ],
    });
  };

  function validatePersonalDetails(form) {
    const errors = {};
    if (!form.name || form.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (!form.email || form.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  }

  const validateExperience = (experience) => {};

  // const nextStep = () => setStep(step + 1);

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (step === 1) {
      const validationErrors = validatePersonalDetails(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Stop navigation if errors
      }
    }

    if (step === 3) {
      validateExperience(form.experience);
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setStep(step - 1);
  };

  if (step === 6 || step === -1) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] w-full">
        <CircularProgress size="80px" style={{ color: "#ff4fa1" }} />
        <div className="mt-8 text-lg font-primary-regular font-semibold">
          {loadingMessages[messageIndex]}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="bg-white shadow-gray-500 p-4 sm:p-6 rounded-lg w-full max-w-7xl mx-auto font-primary-regular flex flex-col md:flex-row gap-4 sm:gap-6">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 mt-3 tracking-wider text-center">
            {step === 1 && "Personal Details"}
            {step === 2 && "Educational History"}
            {step === 3 && "Employment History"}
            {step === 4 && "Projects"}
            {step === 5 && "Additional Info"}
          </h2>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
              <div>
                <InputField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mb-1">{errors.name}</p>
                )}
              </div>
              <div>
                <InputField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <InputField
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555-1234"
                />
              </div>
              <div>
                <InputField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <InputField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Toronto"
                />
              </div>
              <div>
                <InputField
                  label="Province"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  placeholder="Ontario"
                />
              </div>
              <div>
                <InputField
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <InputField
                  label="Personal Website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              {form.education.map((entry, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
                    <InputField
                      label="School / University"
                      name="school"
                      value={entry.school}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="University of Toronto"
                    />
                    <InputField
                      label="Degree / Qualification"
                      name="degree"
                      value={entry.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Bachelor of Science"
                    />
                    <InputField
                      label="Field of Study"
                      name="field"
                      value={entry.field}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="Computer Science"
                    />
                    <InputField
                      label="Start Year"
                      name="start"
                      value={entry.start}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="2019"
                    />
                    <InputField
                      label="End Year"
                      name="end"
                      value={entry.end}
                      onChange={(e) => handleEducationChange(index, e)}
                      placeholder="2023"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="text-blue-600 font-medium hover:underline mb-4">
                + Add Another Education
              </button>
            </>
          )}

          {step === 3 && (
            <>
              {form.experience.map((job, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
                    <InputField
                      label="Job Title"
                      name="jobTitle"
                      value={job.jobTitle}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Frontend Developer"
                    />
                    <InputField
                      label="Company"
                      name="company"
                      value={job.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Google"
                    />
                    {errors.company && (
                      <p className="text-red-600 text-xs mb-1">
                        {errors.company}
                      </p>
                    )}
                    <InputField
                      label="Location"
                      name="location"
                      value={job.location}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Toronto, ON"
                    />
                    <InputField
                      label="Start Date"
                      name="startDate"
                      value={job.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Jan 2020"
                    />
                    <InputField
                      label="End Date"
                      name="endDate"
                      value={job.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Jun 2023"
                    />
                    <div className="sm:col-span-2">
                      <Textarea
                        label="Job Description"
                        name="description"
                        value={job.description || ""}
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="text-blue-600 font-medium hover:underline mb-4">
                + Add Another Job
              </button>
            </>
          )}

          {step === 4 && (
            <>
              {form.projects.map((project, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
                    <InputField
                      label="Project Title"
                      name="title"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Portfolio Website"
                    />
                    <InputField
                      label="Technologies Used"
                      name="technologies"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="Ex: React, Node.js, MongoDB"
                    />
                    <InputField
                      label="Project Link"
                      name="link"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, e)}
                      placeholder="https://github.com/yourproject"
                    />
                    <div className="sm:col-span-2">
                      <Textarea
                        label="Project Description"
                        name="description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder="Describe the project, your role, and impact"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="text-blue-600 font-medium hover:underline mb-4">
                + Add Another Project
              </button>
            </>
          )}

          {step === 5 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 mb-4">
                <InputField
                  label="Your Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Fullstack Developer"
                />
                <InputField
                  label="Target Job Roles (separated by commas)"
                  name="targetRoles"
                  value={form.targetRoles}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer, UI/UX Designer"
                />
                <InputField
                  label="Skills (separated by commas)"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript, React, Team Leadership"
                />
                <div className="hidden sm:block"></div>{" "}
                {/* Spacer for grid alignment */}
                <div className="sm:col-span-2">
                  <Textarea
                    label="Professional Summary"
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    placeholder="Write a short paragraph about your experience, goals, or strengths."
                    rows={6}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/3 rounded-xl ">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 mt-3 tracking-wider text-center">
            Tips
          </h2>
          <div className="text-sm text-gray-700 text-left">
            <ul className="space-y-3">
              {step === 1 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    Choose an email that includes your name and avoids nicknames
                    or unprofessional phrases.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    Use a number you answer regularly.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    Include your LinkedIn URL if your profile is up to date and
                    matches your resume.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    Only include your website if it showcases your work
                    (portfolio, GitHub, personal site).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">⚡</span>
                    City and province/state are usually sufficient.
                  </li>
                </>
              )}

              {step === 2 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">📌</span>
                    List your most recent education first.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">📌</span>
                    Avoid listing high school if you have a college degree
                    unless specifically requested.
                  </li>
                </>
              )}

              {step === 3 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">✔️</span>
                    List your most recent job first and work backward through
                    your last 10 years of employment.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">✔️</span>
                    Include key details for each job, such as job title,
                    company, location, and dates.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">✔️</span>
                    Focus on achievements over duties to show your impact.
                  </li>
                </>
              )}

              {step === 4 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">💡</span>
                    List projects that best demonstrate your skills and are most
                    relevant to the job or field you’re targeting.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">💡</span>
                    Summarize what the project does, its purpose, and your role
                    in it.
                  </li>
                </>
              )}

              {step === 5 && (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">✨</span>
                    Clearly define your role. It should match as much as it can
                    with your experience and skills.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">✨</span>
                    Only include target roles that are relevant and meaningful.
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t-0 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between bg-white px-4 sm:px-10 py-2">
        {step !== 1 ? (
          <Button
            className="px-6 py-1 text-slate-900 bg-gradient-to-r from-yellow-400 to-yellow-500 border-none shadow-md hover:shadow-lg transition"
            onClick={prevStep}>
            Back
          </Button>
        ) : (
          <div className="hidden sm:block" />
        )}
        <Button
          className="px-6 py-1 text-slate-900 bg-gradient-to-r from-yellow-400 to-yellow-500 border-none shadow-md hover:shadow-lg transition"
          onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Form;
