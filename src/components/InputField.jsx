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
        className="w-full px-4 py-2  bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;
