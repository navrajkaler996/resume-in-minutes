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
        className="w-full px-4 py-2 rounded-md border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-0 resize-none"
      />
    </div>
  );
}
