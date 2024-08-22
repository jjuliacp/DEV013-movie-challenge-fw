import { GrPowerReset } from "react-icons/gr";

interface ListOptionsProps {
  type: string;
  options: { value: string; label: string }[];
  selectedOption: { value: string; label: string } | null;
  onChange: (option: { value: string; label: string }) => void;
  onClear: () => void;
}

const ListOptions: React.FC<ListOptionsProps> = ({
  type,
  options,
  selectedOption,
  onChange,
  onClear,
}) => {
  const defaultValue = "default";

  return (
    <>
      <form className="filters-container">
        <select
          className="genre-select"
          name="genre"
          id="genre-select"
          value={selectedOption?.value || defaultValue}
          onChange={(e) =>
            onChange({ value: e.target.value, label: e.target.value })
          }
        >
          <option value={defaultValue}>{type}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && selectedOption.value !== defaultValue && (
          <button title="clear" type="button" onClick={onClear}>
            <GrPowerReset />
          </button>
        )}
      </form>
    </>
  );
};

export default ListOptions;
