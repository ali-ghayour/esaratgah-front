import { useState, useEffect } from "react";

interface Option {
  value: string;
  label: JSX.Element;
}

interface CustomDropdownProps {
  options?: Option[];
  selectedUser: string | undefined;
  onChange: (selectedOption: Option | null) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
}

const CustomDropdown = ({
  options = [],
  selectedUser,
  onChange,
  searchTerm,
  onSearchChange,
  isLoading,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  // Helper function to extract text from the `label` JSX.Element
  const extractText = (element: JSX.Element): string => {
    if (typeof element === "string") return element;
    if (Array.isArray(element.props?.children)) {
      return element.props.children
        .map((child: any) => (typeof child === "string" ? child : ""))
        .join("");
    }
    return element.props?.children || "";
  };

  // Filter options when search term or options change
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = options.filter((option) =>
      extractText(option.label).toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsOpen(true)} // Open dropdown when input is focused
        disabled={isLoading}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <div className="dropdown-item" style={{ padding: "8px" }}>
            No results found
          </div>
        </div>
      )}
    </div>
  );
};

export { CustomDropdown };
