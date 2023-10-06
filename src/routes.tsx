// Icons
import SquerePlusIcon from "@icons/square-plus.svg?component";
import DeleteIcon from "@icons/delete-icon.svg?component";
import DocIcon from "@icons/doc-icon.svg?component";
import UploadIcon from "@icons/upload.svg?component";
import GpsIcon from '@/icons/ApoyoTecnico/gps-icon.svg?component'
import GraphIcon from '@/icons/graph-icon.svg?component'
// Views Admin
import MainDashboard from "@/views/admin/default";
import SolicitudesView from "@/views/admin/solicitudes";
import UploadFile from "@/views/admin/UploadImage";
import RegistroPrae from "./views/admin/RegistroPrae";
import RegistroEcu from "./views/admin/RegistroEcu";
// Views Auth
import SignInView from "@/views/Auth";
// View Apoyo tecnico
import ApoyoTecnico from './views/admin/Apoyo_Tecnico'
import ListApoyoTecnico  from './views/admin/ListApoyoTecnico'

const routes = [
  {
    name: "Agregar Solicitud",
    layout: "/admin",
    path: "default",
    icon: <SquerePlusIcon className="h-6 w-6 stroke-current" />,
    component: <MainDashboard />,
  },
  {
    name: "Solicitudes",
    layout: "/admin",
    path: "view-solicitudes",
    icon: <DocIcon className="h-6 w-6 stroke-current" />,
    component: <SolicitudesView />,
    secondary: true,
  },
  {
    name: "Apoyo Tecnico",
    layout: "/admin",
    path: "apoyo-tecnico",
    icon: <GpsIcon className="h-6 w-6 stroke-current" />,
    component: <ApoyoTecnico />,
    secondary: true,
  },
  {
    name: "Lista A. Tecnico",
    layout: "/admin",
    path: "lista-a-tecnico",
    icon: <DocIcon className="h-6 w-6 stroke-current" />,
    component: <ListApoyoTecnico />,
    secondary: true,
  },
  {
    name: "Subir Archivo Excel",
    layout: "/admin",
    path: "add-file-excel",
    icon: <UploadIcon className="h-6 w-6 stroke-current" />,
    component: <UploadFile />,
    secondary: true,
  },
  {
    name: "Registro Sistema PRAE",
    layout: "/admin",
    path: "registro-prae",
    icon: <GraphIcon className="h-6 w-6 " />,
    component: <RegistroPrae />,
    secondary: true,
  },
  {
    name: "Registro Sistema ECU",
    layout: "/admin",
    path: "registro-ecu",
    icon: <GraphIcon className="h-6 w-6 " />,
    component: <RegistroEcu />,
    secondary: true,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignInView />,
    secondary: true,
  },
];
export default routes;
