// src/components/TextareaField.jsx
export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false, // Add required prop with default value
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium mb-1 text-gray-500"
        htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        required={required} // Pass required to textarea
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-0 resize-none"
      />
    </div>
  );
}
