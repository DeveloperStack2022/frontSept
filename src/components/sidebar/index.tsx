import XIcon from '@icons/x-icon.svg?component'
import LogoIcon from "@icons/logo.svg?component";
import routes from '@/routes'
import LogoutIcon from '@icons/logout-icon.svg?component'
import Tooltip from '@components/Tooltip'
import useAuth from '@/hooks/useAuth'
// Components
import Links from './components/Link'
const Sidebar = (props:{open:boolean,onClose: React.MouseEventHandler<HTMLSpanElement>}) => {
    const {open,onClose} = props
    const {logout} = useAuth();

    const handleLogout = () => {
        logout()
    }   
    return (
        <aside className={`flex h-screen w-18 flex-col items-center border-r border-gray-200 bg-white`}>
            <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
                <XIcon className="" />
            </span>
            <div className="flex h-18 w-full items-center justify-center border-b border-gray-200">
              <LogoIcon />
            </div>
            {/* Nav */}
            <nav className="flex flex-1 flex-col gap-y-4 pt-10">
                <Links routes={routes} />
            </nav>
            <div className="flex flex-col items-center gap-y-4 py-10">
                <button className="text-gray-400 group relative rounded-xl p-2 hover:bg-gray-50 " onClick={handleLogout}>
                    <LogoutIcon className='w-6 h-6 stroke-current' />
                    <Tooltip>
                        Salir
                    </Tooltip>
                </button>

                {/* <button className="mt-2 rounded-full bg-gray-100 text-gray-400  ">
                    <svg  viewBox="0 0 24 24" className='w-8 h-8 stroke-current' strokeWidth="1.7" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 20v-1a7 7 0 0110-6.326M16.635 16.415l1.039-2.203a.357.357 0 01.652 0l1.04 2.203 2.323.356c.298.045.416.429.2.649l-1.68 1.713.396 2.421c.051.311-.26.548-.527.401L18 20.812l-2.078 1.143c-.267.147-.578-.09-.527-.4l.396-2.422-1.68-1.713c-.216-.22-.098-.604.2-.65l2.324-.355z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button> */}
            </div>
        </aside>
    )
}
export default Sidebar;