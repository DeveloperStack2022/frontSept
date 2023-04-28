import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";

export default function Auth(){
    const getRoutes = (routes:RoutesType[]) => {
        return routes.map((prop,key) => {
            if(prop.layout == '/auth'){
                return (
                    <Route path={`${prop.path}`} element={prop.component} key={key} />
                )
            }else{
                return null;
            }
        })
    }

    document.documentElement.dir = "ltr";

    return (
        <main className="flex justify-center items-center min-w-full min-h-screen bg-gray-300">
            <Routes>
                {getRoutes(routes)}
                <Route path='/' element={<Navigate to='/auth/sign-in' replace />} />
            </Routes>
        </main>
    )

}

