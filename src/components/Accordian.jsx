import React, { useState } from "react";

export default function Accordion({
  title,
  icon,
  iconColor = "text-yellow-500",
  headerBg = "bg-white",
  borderColor = "border-gray-400",
  bodyBg = "bg-orange-100",
  bodyBorder = "border-orange-200",
  suggestions = [],
  defaultOpen = false,
}) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="w-full">
      {/* Accordion Header */}
      <div
        className={`border ${borderColor} w-full pt-2 pb-2 mt-6 flex justify-between items-center rounded-xl ${headerBg} cursor-pointer`}
        onClick={() => setExpanded((prev) => !prev)}>
        <div className="flex items-center ml-5">
          {icon && <span className={`${iconColor} text-xl mr-2`}>{icon}</span>}
          <p className="font-primary-regular">{title}</p>
        </div>
        <span
          className={`w-4 h-4 mr-5 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}>
          ▼
        </span>
      </div>

      {/* Accordion Body */}
      <div
        className={`
          transition-all duration-500 overflow-hidden
          ${expanded ? "max-h-[5000px] mt-2 opacity-100" : "max-h-0 opacity-0"}
        `}>
        <div
          className={`${bodyBg} border ${bodyBorder} rounded-xl shadow p-6 mx-auto w-full`}>
          {suggestions.length > 0 ? (
            <ul className="list-none space-y-3">
              {[...new Set(suggestions)].map((suggestion, idx) => (
                <li key={idx} className="flex items-center text-gray-800">
                  <span className={`${iconColor} text-xl mr-2`}>{icon}</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No suggestions in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
