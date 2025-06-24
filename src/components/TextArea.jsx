// src/components/TextareaField.jsx
export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-500">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none  bg-gray-100"
      />
    </div>
  );
}
