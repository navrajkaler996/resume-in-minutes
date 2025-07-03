import { useState } from "react";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import StepperMU from "../components/Stepper";

const FormScreen = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Navbar />
      <StepperMU step={step - 1} />
      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex justify-center font-primary-regular">
        <Form step={step} setStep={setStep} />
      </div>
    </>
  );
};

export default FormScreen;
