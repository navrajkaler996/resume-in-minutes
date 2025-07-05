// src/components/InputField.jsx
function InputField({ label, value, onChange, name, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-500">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-1 border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-0"
      />
    </div>
  );
}

export default InputField;
