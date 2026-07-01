import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { classNames } from '../../utils';

const Dropdown = ({ label, options = [], value, onChange, placeholder = 'Select...', className = '' }) => {
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-primary-500">
            <span className={classNames(!selected && 'text-gray-400')}>
              {selected?.label || placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FiChevronDown className="text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 data-[focus]:bg-primary-50 data-[focus]:text-primary-900"
              >
                {({ selected: isSelected }) => (
                  <>
                    <span className={classNames(isSelected && 'font-semibold')}>{option.label}</span>
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                        <FiCheck />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
