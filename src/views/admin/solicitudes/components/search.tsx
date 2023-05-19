import {ChangeEvent,ChangeEventHandler,RefObject,FC,FocusEventHandler,FocusEvent} from 'react'

type SearchInputProps = {
    value:string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: Function
    inputRef: RefObject<HTMLInputElement>;
    placeholder?: string;
    maxLength:number
    onFocus: FocusEventHandler<HTMLInputElement>
    setSearchString:ChangeEventHandler<HTMLInputElement>
    
}

const SearchComponent:FC<SearchInputProps> = ({value,inputRef,onChange,onKeyDown,placeholder,maxLength,onFocus,setSearchString}) => {

    let manualFocus = true

    const setFocus = () => {
        manualFocus = false
        inputRef?.current && inputRef.current.focus()
        manualFocus = true
    }

    const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
        manualFocus && onFocus(event)
    }
    
    const maxLengthProperty = maxLength ? { maxLength } : {}
    
    return (
        <input 
            type="text"
            className='px-4 py-1 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 rounded-md'
            value={value}
            spellCheck={true}
            onChange={setSearchString}
            ref={inputRef}
            onKeyDown={(event) => onKeyDown({event}) }
            onFocus={handleOnFocus}
            placeholder={placeholder}
            {...maxLengthProperty}
        />
    )
}

export default SearchComponent;