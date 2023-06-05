import {
  FunctionComponent,
  useRef,
  KeyboardEventHandler,
  FocusEvent,
  SVGProps,
} from "react";
const defaultCompleteKeys = ["Enter", "Tab", ","];
import clsx from "clsx";

export type DataValue = {
  value: string;
  icon: FunctionComponent<
    SVGProps<SVGElement> & { title?: string | undefined }
  >;
  id: string;
};

export interface TagInputProps {
  /**
   * A list of autocomplete suggestion
   * @example ['work', 'personal', 'school']
   */
  options?: DataValue[];
  /**
   * Current value
   * @example ['work', 'personal', 'school']
   */
  value: string[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Keys that create a new tag
   */
  completeKeys?: string[];
  /**
   * Handle tag input changes
   */
  onChange: (value: string[]) => void;
  /**
   * Handle Open
   */
  onOpen: () => void;
  open: boolean;
}

/**
 * Tag input component
 * @example ```jsx
 <TagInput value={value} onChange={(newValue) => setValue(newValue)} options={['project X', 'project Y']} colorize placeholder="Enter a new tag" />
 ```
*/
const TagInput: FunctionComponent<TagInputProps> = (props: TagInputProps) => {
  const {
    value = [],
    onChange,
    onOpen,
    open,
    options = [],
    placeholder,
    completeKeys = defaultCompleteKeys,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;

    if (completeKeys?.includes(key)) {
      let newTagValue = inputRef.current!.value;
      newTagValue = newTagValue.trim();
      event.preventDefault();

      if (value.length > 0) {
        return;
      }

      if (!newTagValue.length) {
        return;
      }

      if (value.includes(newTagValue)) {
        return;
      }

      inputRef.current!.value = "";
      onChange([...value, newTagValue]);
    }

    if (key === "Backspace") {
      const newTagValue = inputRef.current!.value;

      if (!newTagValue.trim().length) {
        onChange(value.slice(0, value.length - 1));
      }
    }
  };

  function removeTag(removedTag: string) {
    inputRef.current!.value = "";
    onChange(value.filter((tag) => tag !== removedTag));
  }

  function focusOnInput() {
    inputRef.current!.focus();
  }

  return (
    <div className="b-1 relative w-[220px] rounded-sm border  border-blue-500 py-1">
      <div
        className={clsx(
          "transition-tborder-2 absolute top-[40px] flex w-full flex-wrap gap-x-1  overflow-hidden border-2 border-black bg-white p-2",
          open && "visible translate-x-0 translate-y-0 opacity-100",
          !open && "invisible translate-x-5 translate-y-0 opacity-0"
        )}
      >
        {options.map((item) => (
          <label
            className="flex  items-center justify-between whitespace-nowrap rounded-lg bg-blue-100  px-2 py-1 text-center   align-baseline leading-none text-blue-700 transition-all hover:cursor-pointer hover:bg-blue-300"
            key={item.id}
          >
            {item.icon}
            <span className="text-base font-semibold">{item.value}</span>
          </label>
        ))}
      </div>

      {value?.map((tag) => (
        <span
          className="mr-1 rounded-sm bg-green-500/60 px-2 py-1 text-center text-white"
          key={tag}
        >
          {tag}
          <button
            className="ml-1 cursor-pointer bg-none text-white"
            onClick={() => removeTag(tag)}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        className="border-none bg-transparent "
        onKeyDown={onKeyDown}
        ref={inputRef}
        onFocus={onOpen}
        onBlur={onOpen}
      />

      {/* <datalist id="tags">
                {options?.map((option) => (
                <option key={option} value={option} data-testid="option">
                    {option}
                </option>
                ))}
            </datalist> */}
    </div>
  );
};

export default TagInput;
