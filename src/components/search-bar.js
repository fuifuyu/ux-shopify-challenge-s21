import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchBar({
  header,
  placeholder,
  noPlaceholder = false,
  onInput,
  inputKey,
  className,
}) {
  return (
    <div className={className}>
      <label className="text-sm" htmlFor={inputKey}>
        {header}
      </label>
      <div className="flex flex-row border p-input rounded focus-within:ring">
        <FontAwesomeIcon icon={faSearch} className="self-center" />
        <input
          className="ml-3 focus:outline-none w-full"
          placeholder={noPlaceholder ? "" : placeholder ?? header}
          onInput={onInput}
          id={inputKey}
        />
      </div>
    </div>
  );
}
