import Form from "../components/Form";
import Navbar from "../components/Navbar";

const FormScreen = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-custom-gradient p-6 font-primary flex justify-center font-primary-regular">
        <Form />
      </div>
    </>
  );
};

export default FormScreen;
