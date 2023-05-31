
interface IProps {
    percentage: number
}

const ProgressBar = ({percentage}:IProps) => {
    return (
        <div className="h-1 w-full bg-gray-500 transition-all">
            <div aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} className="h-full bg-blue-600" style={{width: `${percentage}%`}}></div>
        </div>
    )
}
export default ProgressBar