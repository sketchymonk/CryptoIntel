
import React from 'react';
import Tooltip from './Tooltip';
import { helpContent } from './helpContent';

const commonInputClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition";
const commonLabelClass = "block mb-1 text-sm font-medium text-gray-300";

interface CommonFieldProps {
  id: string;
  label: string;
  sectionId: string;
  fieldId: string;
}

const LabelWithTooltip: React.FC<{ htmlFor?: string; className?: string; sectionId: string; fieldId: string; label: string }> = ({ htmlFor, className, sectionId, fieldId, label }) => {
  const helpText = (helpContent[sectionId] as any)?.[fieldId] as string | undefined;

  return (
    <label htmlFor={htmlFor} className={`${className} flex items-center`}>
      <span>{label}</span>
      {helpText && <Tooltip content={helpText} />}
    </label>
  );
};


interface InputProps extends CommonFieldProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const TextInput: React.FC<InputProps> = ({ id, label, value, placeholder, onChange, sectionId, fieldId }) => (
  <div>
    <LabelWithTooltip htmlFor={id} className={commonLabelClass} label={label} sectionId={sectionId} fieldId={fieldId} />
    <input
      type="text"
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={commonInputClass}
    />
  </div>
);

export const TextArea: React.FC<InputProps> = ({ id, label, value, placeholder, onChange, sectionId, fieldId }) => (
  <div>
    <LabelWithTooltip htmlFor={id} className={commonLabelClass} label={label} sectionId={sectionId} fieldId={fieldId} />
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${commonInputClass} h-24`}
      rows={4}
    />
  </div>
);

interface SelectProps extends InputProps {
  options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectProps> = ({ id, label, value, options, onChange, sectionId, fieldId }) => (
  <div>
    <LabelWithTooltip htmlFor={id} className={commonLabelClass} label={label} sectionId={sectionId} fieldId={fieldId} />
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={commonInputClass}
    >
      <option value="" disabled>Select an option</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

interface CheckboxGroupProps extends CommonFieldProps {
  value: string[];
  options: { value: string; label: string }[];
  onChange: (value: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ id, label, value, options, onChange, sectionId, fieldId }) => {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div>
      <LabelWithTooltip className={commonLabelClass} label={label} sectionId={sectionId} fieldId={fieldId} />
      <div className="space-y-2 mt-2">
        {options.map(option => (
          <label key={option.value} htmlFor={`${id}-${option.value}`} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-300">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface SingleCheckboxProps extends CommonFieldProps {
  value: boolean;
  description?: string;
  onChange: (value: boolean) => void;
}

export const SingleCheckbox: React.FC<SingleCheckboxProps> = ({ id, label, value, description, onChange, sectionId, fieldId }) => {
    const helpText = (helpContent[sectionId] as any)?.[fieldId] as string | undefined;

    return (
        <div className="flex items-start space-x-3 bg-gray-700/50 p-3 rounded-md">
            <input
                type="checkbox"
                id={id}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 rounded border-gray-500 bg-gray-800 text-purple-600 focus:ring-purple-500 mt-1 flex-shrink-0"
            />
            <label htmlFor={id} className="cursor-pointer">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-200">{label}</span>
                    {helpText && <Tooltip content={helpText} />}
                </div>
                {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
            </label>
        </div>
    );
}
