// Icons
import SquerePlusIcon from "@icons/square-plus.svg?component";
import DeleteIcon from "@icons/delete-icon.svg?component";
import DocIcon from "@icons/doc-icon.svg?component";
import UploadIcon from "@icons/upload.svg?component";
// Views Admin
import MainDashboard from "@/views/admin/default";
import SolicitudesView from "@/views/admin/solicitudes";
import UploadFile from "@/views/admin/UploadImage";
// Views Auth
import SignInView from "@/views/Auth";

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
    name: "Subir Archivo Excel",
    layout: "/admin",
    path: "add-file-excel",
    icon: <UploadIcon className="h-6 w-6 stroke-current" />,
    component: <UploadFile />,
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
