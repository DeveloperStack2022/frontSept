import {FunctionComponent,useRef,KeyboardEventHandler,FocusEvent, SVGProps} from 'react'
const defaultCompleteKeys = ['Enter', 'Tab', ','];
import clsx from 'clsx';

export type DataValue = {
    value:string;
    icon:FunctionComponent<SVGProps<SVGElement> && { title?:string | undefined; }>;
    id:string
}

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
    onOpen: () => void
    open:boolean
}


/**
 * Tag input component
 * @example ```jsx
 <TagInput value={value} onChange={(newValue) => setValue(newValue)} options={['project X', 'project Y']} colorize placeholder="Enter a new tag" />
 ```
*/
const TagInput:FunctionComponent<TagInputProps> = (props:TagInputProps) => {

    const {
        value = [],
        onChange,
        onOpen,
        open,
        options = [],
        placeholder,
        completeKeys = defaultCompleteKeys,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null)

    const onKeyDown: KeyboardEventHandler<HTMLInputElement>  = (event) => {
        const {key} = event

        if(completeKeys?.includes(key)){
            let newTagValue = inputRef.current!.value
            newTagValue = newTagValue.trim()
            event.preventDefault()
            
            if(value.length > 0 ){
                return;
            }

            if(!newTagValue.length) {
                return;
            }

            if(value.includes(newTagValue)){
                return;
            }
            
            inputRef.current!.value = ''
            onChange([...value,newTagValue])

        }

        if (key === 'Backspace') {
            const newTagValue = inputRef.current!.value;
    
            if (!newTagValue.trim().length) {
                onChange(value.slice(0, value.length - 1));
            }
        }
      
    }

    function removeTag(removedTag: string) {
        inputRef.current!.value = ''
        onChange(value.filter((tag) => tag !== removedTag));
    }

    function focusOnInput() {
        inputRef.current!.focus();
    }

    

    return (
        <div className="border b-1 border-blue-500 rounded-sm py-1  relative w-[220px]">
            <div className={clsx(
                    'bg-white absolute top-[40px] overflow-hidden w-full flex transition-transform gap-x-1',
                    open && 'visible opacity-100 translate-x-0 translate-y-0',
                    !open && 'invisible opacity-0 translate-y-0 translate-x-5'
                    
                )}
            >
                {options.map(item => (
                    <label className='inline-block whitespace-nowrap rounded-[0.27rem] bg-blue-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-blue-700 ' key={item}>
                        <span>{item}</span>
                    </label>
                ))}
            </div>
            
            
            {value?.map((tag) => (
                <span 
                    className='bg-green-500/60 text-white mr-1 py-1 px-2 text-center rounded-sm'
                    key={tag}
                    >{tag}<button className='ml-1 cursor-pointer text-white bg-none' onClick={() => removeTag(tag)}>&times;</button>
                </span>
            ))}
            <input type="text" className='bg-transparent border-none ' onKeyDown={onKeyDown} ref={inputRef} onFocus={onOpen} onBlur={onOpen}  />

            {/* <datalist id="tags">
                {options?.map((option) => (
                <option key={option} value={option} data-testid="option">
                    {option}
                </option>
                ))}
            </datalist> */}
        </div>
    )
}

export default TagInput