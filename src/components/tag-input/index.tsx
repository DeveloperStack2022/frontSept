import {
  FunctionComponent,
  useRef,
  KeyboardEventHandler,
  FocusEvent,
  SVGProps,
  MouseEvent,
  MouseEventHandler,
  ChangeEvent
} from "react";
const defaultCompleteKeys = ["Enter", "Tab", ","];
import clsx from "clsx";

// FIXME: Icons 
import SearchIcon from '@/icons/search-icon.svg?component'

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
   * Handle input changes
   */
  onChangeInput: (value:string) => void;
  /**
   * Handle Open
   */
  onClickSearch:() => void
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
    onChangeInput,
    onClickSearch,
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

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: valueInput} = e.currentTarget
    onChangeInput(valueInput)
  }

  const handleClickItem = (e:MouseEvent<HTMLLabelElement>) => {
    const id = e.currentTarget.getAttribute('data-id')
    let newTagValue = options.filter(i => i.id == id)[0]

    if (value.length > 0) {
      return;
    }

    onChange([...value,newTagValue.value])
   
  }

  function removeTag(removedTag: string) {
    inputRef.current!.value = "";
    onChange(value.filter((tag) => tag !== removedTag));
  }


  return (
    <div className="flex ">
    <div className="relative flex rounded-sm border w-[460px] gap-x-2 border-blue-500 py-1 px-2">
      <div
        className={clsx(
          "absolute top-[40px] flex w-full flex-wrap gap-x-1 gap-y-2  overflow-hidden  bg-white p-2",
          open && "visible translate-x-0 translate-y-0 opacity-100",
          !open && "invisible translate-x-5 translate-y-0 opacity-0"
        )}
      >
        {options.map((item) => (
          <label
            onClick={(e:MouseEvent<HTMLLabelElement>) => handleClickItem(e)}
            data-id={item.id}
            className="flex items-center justify-between whitespace-nowrap rounded-lg bg-slate-100  px-2 py-.5 text-center  align-baseline leading-none text-slate-500 transition-all hover:cursor-pointer hover:bg-slate-300"
            key={item.id}
            >
            {item.icon}
            <span className="text-base font-semibold ">{item.value}</span>
          </label>
        ))}
      </div>

      {value?.map((tag) => (
        <span
        className="flex justify-between mr-1 shrink-0 rounded-sm bg-blue-500 px-2 py-1 text-center text-white leading-none"
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
        className="border-none bg-transparent focus-visible:outline-none flex-1 "
        onKeyDown={onKeyDown}
        ref={inputRef}
        onFocus={onOpen}
        onBlur={onOpen}
        onChange={handleChangeValue}
      />
      
    </div>
    <button className="rounded-md bg-green-200 text-green-600 px-2 py-.5 hover:bg-green-300 transition-all justify-self-end ml-2" onClick={onClickSearch}>Buscar</button>
  </div>
  );
};

export default TagInput;
