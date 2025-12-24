// src/components/InputField.jsx
function InputField({
  label,
  value,
  onChange,
  name,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full px-4 py-2 rounded-lg border border-gray-200 
          bg-white shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-yellow-400 
          focus:border-transparent transition-all duration-300
          hover:shadow-md
        "
      />
    </div>
  );
}

export default InputField;
