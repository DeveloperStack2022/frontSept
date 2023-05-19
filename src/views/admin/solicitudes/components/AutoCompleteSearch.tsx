import {KeyboardEvent,useState,useRef, ChangeEvent,useCallback,FocusEventHandler,FocusEvent, useEffect} from 'react'
import {default as Fuse} from 'fuse.js'

import SearchComponent from "./search"
import DataListComponent,{Item} from './DataList'
// TODO: UTILS 
import {debounce} from '@/utils/utils'

export interface AutoCompleteSearchProps<T> {
    onHover?: (result: T) => void
    onSelect?: (result: T) => void
    inputSearchString?:string,
    resultStringKeyName?:string;
    onSearch?: (keyboard:string,results: T[]) => void;
    placeholder?:string;
    inputDebounce?:number
    items: T[]
    maxResults?:number
    maxLength?:number
    onFocus?:FocusEventHandler<HTMLInputElement>
    formatResult?:Function
    showNoResultsText?:string
    showNoResults?:boolean
    showItemsOnFocus?:boolean
}

export default function AutoCompleteSearch<T>({
        items = [],
        onHover = () => {},
        onSelect = () => {},
        inputSearchString = '',
        resultStringKeyName = 'text',
        onSearch = () => {},
        placeholder = '',
        inputDebounce = 200,
        maxResults = 10,
        maxLength = 0,
        onFocus = () => {},
        formatResult = () => {},
        showNoResultsText = 'No results',
        showNoResults = true,
        showItemsOnFocus = false
    }:AutoCompleteSearchProps<T>){

    const fuseOptions = {
        includeScore: true,
        keys: ['text']
    }
    const options = { ...fuseOptions }
    const [highlightedItem, setHighlightedItem] = useState<number>(-1)
    const [results, setResults] = useState<any[]>([]);
    const [searchString, setSearchString] = useState<string>(inputSearchString)
    const [isSearchComplete, setIsSearchComplete] = useState<boolean>(false)
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [hasFocus, setHasFocus] = useState<boolean>(false)
    const [showNoResultsFlag, setShowNoResultsFlag] = useState<boolean>(false)

    useEffect(() => {
        setSearchString(inputSearchString)
        const timeoutId = setTimeout(() => setResults(fuseResults(inputSearchString)), 0)
        return () => clearTimeout(timeoutId)
    },[inputSearchString])

    useEffect(() => {
        searchString?.length > 0 && results && results?.length > 0 &&
        setResults(fuseResults(searchString))
    }, [items])

    useEffect(() => {
        if (showNoResults && searchString.length > 0 && !isTyping && results.length === 0 && !isSearchComplete) {
            setShowNoResultsFlag(true)
        } else {
            setShowNoResultsFlag(false)
        }
    }, [isTyping, showNoResults, isSearchComplete, searchString, results])

    useEffect(() => {
        if (showItemsOnFocus && results.length === 0 && searchString.length === 0 && hasFocus) {
          setResults(items.slice(0, maxResults))
        }
    }, [showItemsOnFocus, results, searchString, hasFocus])
    
    useEffect(() => {
        const handleDocumentClick = () => {
          eraseResults()
          setHasFocus(false)
        }
    
        document.addEventListener('click', handleDocumentClick)
    
        return () => document.removeEventListener('click', handleDocumentClick)
    }, [])

    const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
        onFocus(event)
        setHasFocus(true)
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const fuse = new Fuse(items, options)

    const fuseResults = (keyword: string) =>
        fuse
        .search(keyword, { limit: maxResults })
        .map((result) => ({ ...result.item }))
        .slice(0, maxResults)

    const callOnSearch = (keyword:string) => {
        let newResult: T[] = []
        keyword.length > 0 && (newResult = fuseResults(keyword))
        
        setResults(newResult)
        onSearch(keyword,newResult)
        setIsTyping(false)
    }

    const handleOnSearch = useCallback(
        inputDebounce > 0
          ? debounce((keyword: string) => callOnSearch(keyword), inputDebounce)
          : (keyword: string) => callOnSearch(keyword),
        [items]
    )
    
    const handleQueryChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        const keyword = target.value
        setSearchString(keyword)
        handleOnSearch(keyword)
        setIsTyping(true)   
        if(isSearchComplete) {
            setIsSearchComplete(false)
        }

    }

    const eraseResults = () => {
        setResults([])
        setIsSearchComplete(true)
    }

    const handleKeyDown = ({index,event}:{index:number,event: KeyboardEvent<HTMLInputElement>}) => {

        let itemIndex = -1
        const setValues = (index:number) => {
            setHighlightedItem(index)
            results?.[index] && onHover(results[index])
        }
        
        if(index != undefined){
            setHighlightedItem(index)
            results?.[index] && onHover(results[index])
        }else if(event){
            if(event.key === 'ArrowUp'){
                event.preventDefault();
                itemIndex = highlightedItem > -1 ? highlightedItem - 1 : results.length - 1
                setValues(itemIndex)
    
                // setHighlightedItem(prevIndex => prevIndex === -1 ? results.length - 1 : prevIndex - 1)
            }else if(event.key === 'ArrowDown'){
                event.preventDefault()
                itemIndex = highlightedItem < results.length - 1 ? highlightedItem + 1 : -1 
                setValues(itemIndex)
                // setHighlightedItem((prevIndex) => prevIndex === results.length - 1 ? -1 : prevIndex + 1);
            }else if(event.key === 'Enter') {
                if(highlightedItem != -1 ){
                    if(results.length > 0 && results[highlightedItem]) {
                        event.preventDefault();
                        setSearchString(results[highlightedItem][resultStringKeyName])
                        onSearch(results[highlightedItem][resultStringKeyName],results)
                    }else {
                        onSearch(searchString,results)
                    }
                    setHighlightedItem(-1)
                    eraseResults()
                }
            }
        }
        

        
    }

    const handleClick = (result:Item<T>) => {
        eraseResults()
        onSelect(result)
        setSearchString(result[resultStringKeyName])
        setHighlightedItem(0)
    }

    return (
        <>
            <SearchComponent 
                value={searchString}
                placeholder={placeholder}
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                onChange={handleQueryChange}
                setSearchString={handleQueryChange}
                maxLength={maxLength}
                onFocus={handleOnFocus}
            />
          
            <DataListComponent 
                results={results}
                onClick={handleClick}
                setSearchString={setSearchString}
                showIcon={false}
                maxResults={maxResults}
                resultStringKeyName={resultStringKeyName}
                formatResult={formatResult}
                highlightedItem={highlightedItem}
                setHighlightedItem={handleKeyDown}
                showNoResultsFlag={showNoResultsFlag}
                showNoResultsText={showNoResultsText} 
            />
            
        </>
    )
}

