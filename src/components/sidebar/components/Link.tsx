// Icons 
import AddMoreIcon from '@icons/add-more.svg?component'
// Component 
import Tooltip from '@components/Tooltip'

import { Link, useLocation } from "react-router-dom";

export const SidebarLinks = (props:{routes:RoutesType[]}):JSX.Element => {
    let location = useLocation();
    const {routes} = props;

    const activeRoute = (routeName:string) => {
        return location.pathname.includes(routeName)
    }

    const createLinks = (routes:RoutesType[]) =>{
        return routes.map((route,index) => {
            if(route.layout == '/admin') {
                return (
                    <Link key={index} to={route.layout + '/' + route.path}>
                        <div className={`group relative rounded-xl p-2 ${activeRoute(route.path) == true ? 'bg-gray-100 text-blue-600' : 'text-gray-400' }  hover:bg-gray-50`}>
                            {route.icon ? route.icon : <AddMoreIcon className="h-6 w-6 stroke-current" /> }
                            <Tooltip>
                                {route.name}
                            </Tooltip>
                        </div>
                    </Link>
                )
            }
        })
    }

    return <>{createLinks(routes)}</>
}

export default SidebarLinks