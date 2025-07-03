import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
const steps = [
  "Personal details",
  "Education",
  "Experience",
  "Projects",
  "Additional info",
];

function StepContent({ step }) {
  switch (step) {
    case 0:
      return <div>Personal Info Form</div>;
    case 1:
      return <div>Experience Form</div>;
    case 2:
      return <div>Projects Form</div>;
    case 3:
      return <div>Review & Submit</div>;
    default:
      return null;
  }
}

// Custom connector with thicker line and custom color
const ThickStepConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export default function StepperMU() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="bg-primary-1 flex justify-center">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ThickStepConnector />}
        className=" mt-10 w-5xl">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <span className="font-primary-regular text-xl">{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <div style={{ marginTop: 24 }}>
        <StepContent step={activeStep} />
      </div> */}
    </div>
  );
}
