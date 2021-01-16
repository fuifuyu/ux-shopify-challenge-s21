import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchBar({
  header,
  placeholder,
  noPlaceholder = false,
  onInput,
  inputKey,
}) {
  return (
    <>
      <label className="text-sm" htmlFor={inputKey}>
        {header}
      </label>
      <div className="flex flex-row border py-1 px-3 rounded focus-within:ring">
        <FontAwesomeIcon icon={faSearch} className="self-center" />
        <input
          className="ml-3 focus:outline-none w-full"
          placeholder={noPlaceholder ? "" : placeholder ?? header}
          onInput={onInput}
          id={inputKey}
        />
      </div>
    </>
  );
}
