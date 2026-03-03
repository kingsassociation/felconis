"use client";

interface StatusSelectorProps {
  id: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  statusColors: Record<string, string>;
  action: (formData: FormData) => void;
}

export default function StatusSelector({
  id,
  name,
  defaultValue,
  options,
  statusColors,
  action,
}: StatusSelectorProps) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => e.target.form?.requestSubmit()}
        className={`px-4 py-1.5 border rounded-lg text-[9px] font-brand tracking-widest outline-none appearance-none cursor-pointer transition-colors ${
          statusColors[defaultValue] || "bg-gray-50 text-gray-600 border-gray-100"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
