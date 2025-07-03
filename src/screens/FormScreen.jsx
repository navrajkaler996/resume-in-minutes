import Form from "../components/Form";
import Navbar from "../components/Navbar";
import StepperMU from "../components/Stepper";

const FormScreen = () => {
  return (
    <>
      <Navbar />
      <StepperMU />
      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex justify-center font-primary-regular">
        <Form />
      </div>
    </>
  );
};

export default FormScreen;
