import { Dialog } from 'evergreen-ui';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useEffect, useState } from 'react';

import useDeleteAccountMutation from '../hooks/delete-account-mutation';

export const DeleteAccount: FC = () => {

    const [isShown, setIsShown] = useState(false);

    const deleteAccountMutation = useDeleteAccountMutation();
    const router = useRouter();

    const deleteAccount = async () => {

        const deleteAccountResult = await deleteAccountMutation.mutateAsync();

        if (deleteAccountResult.message == "Erfolgreich gelöscht") {
            Cookies.remove('access_token');
        }
    }

    return (
        <div>
            <Dialog
                isShown={isShown}
                title="Account löschen"
                onConfirm={() => {
                    setIsShown(false);
                    deleteAccount();
                    router.push('/register');
                }}
                onCloseComplete={() => {
                    setIsShown(false);
                }}
                intent="danger"
                cancelLabel="Abbrechen"
                preventBodyScrolling
                confirmLabel="Account löschen"
            >
                Bist du dir wirklich sicher das du deinen Account endgültig löschen möchtest?
            </Dialog>

            <button className='bg-red h-10 text-myblue font-medium px-4 w-max hover:bg-rose-700 py-2 rounded-lg mt-10' onClick={() => setIsShown(true)}>Account Löschen</button>
        </div>
    );
}