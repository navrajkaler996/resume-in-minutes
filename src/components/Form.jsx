import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Textarea from "./TextArea";
import Preview from "./Preview";
import { useNavigate } from "react-router-dom";
import { generateExperience } from "../services/openAiService";

function Form() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-1234",
    address: "123 Main Street",
    city: "Toronto",
    province: "Ontario",
    education: [
      {
        school: "University of Toronto",
        degree: "Bachelor of Science",
        field: "Computer Science",
        start: "2019",
        end: "2023",
      },
    ],
    experience: [
      {
        jobTitle: "Frontend Developer",
        company: "Google",
        location: "Toronto, ON",
        startDate: "Jan 2020",
        endDate: "Jun 2023",
        keyPoints: "",
        description:
          "Developed and maintained user interfaces with React. Collaborated with design and backend teams to deliver high-quality features on schedule.",
      },
    ],
    targetRoles: "Frontend Developer, UI Engineer",
    skills: "JavaScript, React, HTML, CSS, Tailwind, Git, TypeScript",
    summary: "asasas",
  });
  // useEffect(() => {
  //   async function fetchExperience() {
  //     if (form?.experience?.length > 0) {
  //       const result = await generateExperience(form.experience[0].description);

  //       return result;
  //     }
  //   }

  //   if (step === 5) {
  //     const keyPoints = fetchExperience();

  //     console.log(keyPoints);

  //     // let experienceTemp = form.experience;

  //     // experienceTemp?.forEach((exp) => {
  //     //   exp.keyPoints = keyPoints;
  //     // });

  //     // let newForm = structuredClone(form);
  //     // newForm.experience = structuredClone(experienceTemp);
  //     setStep(-1);

  //     navigate("/preview", {
  //       state: {
  //         form,
  //       },
  //     });
  //   }
  // }, [step]);

  useEffect(() => {
    async function fetchExperience() {
      if (step === 5 && form?.experience?.length > 0) {
        const keyPoints = await generateExperience(
          form.experience[0].description
        );

        // Example of updating experience with keyPoints:
        const experienceTemp = form.experience.map((exp, idx) =>
          idx === 0
            ? { ...exp, keyPoints } // or keyPoints: keyPointsArray if it's an array
            : exp
        );

        // Deep clone if needed
        const newForm = structuredClone(form);
        newForm.experience = experienceTemp;

        setStep(-1);

        navigate("/preview", {
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="bg-white shadow-gray-500 border-1 border-gray-300 p-6 rounded-lg min-w-5xl max-h-[80vh] overflow-y-auto h-fit mx-auto font-primary-regular flex gap-6 mt-10">
      <div className="w-2/3">
        <h2 className="text-2xl font-semibold mb-6 mt-3 tracking-wider text-center">
          {step === 1 && "Personal Details"}
          {step === 2 && "Educational History"}
          {step === 3 && "Employment History"}
          {step === 4 && "Additonal info"}
        </h2>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <>
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
            <InputField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
            <InputField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555-1234"
            />
            <InputField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main St"
            />
            <InputField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Toronto"
            />
            <InputField
              label="Province"
              name="province"
              value={form.province}
              onChange={handleChange}
              placeholder="Ontario"
            />

            <div className="flex justify-end">
              <Button className="" onClick={nextStep}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {form.education.map((entry, index) => (
              <div key={index} className="mb-6 border-b pb-4">
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
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="text-blue-600 font-medium hover:underline mb-4">
              + Add Another Education
            </button>

            <div className="flex justify-between ">
              <Button
                className="mt-4 bg-gray-500 hover:bg-gray-700 mb-6"
                onClick={prevStep}>
                Back
              </Button>

              <Button className="mt-4 mb-6" onClick={nextStep}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {form.experience.map((job, index) => (
              <div key={index} className="mb-6 border-b pb-4">
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
                <Textarea
                  label="Job Description"
                  name="description"
                  value={job.description || ""}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="text-blue-600 font-medium hover:underline mb-4">
              + Add Another Job
            </button>

            <div className="flex justify-between">
              <Button
                className="mt-4 bg-gray-500 hover:bg-gray-700 mb-6"
                onClick={prevStep}>
                Back
              </Button>
              <Button className="mt-4 mb-6" onClick={nextStep}>
                Next
              </Button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div className="mb-4">
              <InputField
                label="Target Job Roles (separated by commas)"
                name="targetRoles"
                value={form.targetRoles}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer, UI/UX Designer"
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Skills (separated by commas)"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="e.g. JavaScript, React, Team Leadership"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Professional Summary
              </label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Write a short paragraph about your experience, goals, or strengths."
                rows={6}
                className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <Button
                className="mt-4 bg-gray-500 hover:bg-gray-700 mb-6"
                onClick={prevStep}>
                Back
              </Button>

              <Button className="mt-4 mb-6" onClick={nextStep}>
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="w-1/3  pl-6 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 mt-3 tracking-wider text-center">
          Tips
        </h2>
        {/* <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
          {step === 1 && (
            <>
              <li>Use your full legal name.</li>
              <li>Provide a professional email address.</li>
              <li>Double-check your phone number.</li>
            </>
          )}
          {step === 2 && (
            <>
              <li>Include your most relevant education first.</li>
              <li>Add honors or distinctions if applicable.</li>
              <li>Don’t forget the start and end years.</li>
            </>
          )}
          {step === 3 && (
            <>
              <li>List jobs in reverse chronological order.</li>
              <li>Focus on responsibilities and accomplishments.</li>
              <li>Include job location and duration.</li>
            </>
          )}
        </ul> */}
      </div>
    </div>
  );
}

export default Form;
