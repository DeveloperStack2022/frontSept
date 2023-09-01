import {useRef,useEffect,MouseEvent} from 'react'
import {SingleDataPresentation} from '@/schemas/apoyo-tecnico'
interface IProps {
    children: JSX.Element,
    isOpen: boolean
    onClose: () => void

}

export default function ModalPresenter({children,isOpen,onClose}:IProps){
    const modalRef = useRef<HTMLDivElement | null>(null)

    const closeModal = (e:MouseEvent<HTMLDivElement>) => {
        if(e.target == modalRef.current) onClose()
    }

    useEffect(() => {
        const closeModalOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', closeModalOnEscape);
        }

        return () => {
            document.removeEventListener('keydown', closeModalOnEscape);
        };
    }, [isOpen, onClose]);
    return (
       <>
        {isOpen && (
                <div onClick={closeModal} ref={modalRef} className="fixed flex justify-center items-center top-0 right-0 z-50 max-h-full bg-black/[.54] md:inset-0">
                    <div className="relative w-[1300px] h-auto">
                        {children}
                    </div>
                </div>
        )}
       </>
    )
}