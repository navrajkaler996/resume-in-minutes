// src/components/Button.jsx
function Button({
  type = "button",
  children,
  onClick,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "px-10 py-2 rounded-md font-primary-regular track font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-400 text-white hover:bg-gray-500",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    link: "text-blue-600 hover:underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-14 py-1  font-primary-regular tracking-widest text-lg focus:outline-none rounded-md border-1 border-theme-2 bg-theme-1 text-white hover:bg-theme-2 hover:cursor-pointer ${className} `}>
      {children}
    </button>
  );
}

export default Button;
