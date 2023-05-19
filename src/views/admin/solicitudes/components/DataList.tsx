import {MouseEvent,ReactNode} from 'react'

export type Item<T> = T & {[key:string]: any}

interface DataListProps<T> {
    results: Item<T>[]
    onClick: Function
    highlightedItem:number
    setHighlightedItem: Function
    setSearchString: Function
    formatResult?: Function
    showIcon: boolean
    maxResults: number
    resultStringKeyName: string
    showNoResultsFlag?: boolean
    showNoResultsText?: string
}

export default function DataListComponent<T>({
    results,
    highlightedItem,
    maxResults,
    onClick,
    resultStringKeyName,
    setHighlightedItem,
    setSearchString,
    formatResult,
    showNoResultsFlag,
    showNoResultsText
    }:DataListProps<T>){

    type WithStringKeyName = T & Record<string,unknown> // Record<'prop1' | 'prop2' | 'prop3',unknow>

    const formatResultWithKey  = formatResult ? formatResult : (item: WithStringKeyName) => item[resultStringKeyName]
    
    const handleClick = (result: WithStringKeyName) => {
        onClick(result)
        setSearchString(result[resultStringKeyName])
    }

    const handleMouseDown = (
        {
            event,
            result
        }:{
            event:MouseEvent<HTMLLIElement>,
            result:WithStringKeyName
        }) => {
            if(event.button == 0) {
                event.preventDefault()
                handleClick(result)
            }
    }

    if(showNoResultsFlag){
        return (
            <ResultsWrapper>
                <li>
                    <div>{showNoResultsText}</div>
                </li>
            </ResultsWrapper>
        )
    }
    
    if (results?.length <= 0 && !showNoResultsFlag) {
        return null
    }

    return (
       <ResultsWrapper>
            {results.slice(0,maxResults).map((result,index) => (
                <li
                    key={index}
                    className={`${highlightedItem == index ? 'bg-gray-500/40' : 'bg-white'} border-b border-b-gray-200  px-2 py-2`}
                    onMouseEnter={() => setHighlightedItem({index})}
                    onMouseDown={(event) => handleMouseDown({result,event})}
                    onClick={() => handleClick(result)}
                >
                    {formatResultWithKey(result)}
                </li>
            )) }
       </ResultsWrapper>
    )
}

const ResultsWrapper = ({children}:{children: ReactNode}) => {
    return (
        <ul>
            {children}
        </ul>
    )
}
