import { Dialog } from 'evergreen-ui';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const SignOut = ({ ...props }) => {

    const [isShown, setIsShown] = useState(false);
    const router = useRouter();


    const signOut = async () => {
        Cookies.remove('access_token');
    }

    return (
        <div {...props}>
            <Dialog
                isShown={isShown}
                title="Abmelden"
                onConfirm={() => {
                    setIsShown(false);
                    signOut();
                    if (router.pathname == '/login') {
                        router.push('/');
                        return;
                    }
                    router.push('/login');
                }}
                onCloseComplete={() => {
                    setIsShown(false);
                }}
                intent="danger"
                cancelLabel="Abbrechen"
                preventBodyScrolling
                confirmLabel="Abmelden"
            >
                Willst du dich wirklich abmelden?
            </Dialog>

            <button onClick={() => setIsShown(true)} className='bg-red h-10 text-myblue font-medium px-4 w-max hover:bg-rose-700 py-2 rounded-lg'>Abmelden</button>
        </div>
    );
}