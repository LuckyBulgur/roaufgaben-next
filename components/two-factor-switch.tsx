import { Switch } from 'evergreen-ui';
import Img from 'next/image';
import { FC } from 'react';
import { useEffect, useState } from 'react';

import useCreateTwoFactorMutation from '../hooks/create-2fa-mutation';

interface TwoFactorSwitchProps {
    haveTwoFactor: boolean;
}

export const TwoFactorSwitch: FC<TwoFactorSwitchProps> = ({ haveTwoFactor }) => {

    const [twoFactor, setTwoFactor] = useState<any>({});
    const [disabled, setDisabled] = useState(false);
    const [checked, setChecked] = useState(haveTwoFactor)
    const createTwoFactorMutation = useCreateTwoFactorMutation();

    const handleChange = async () => {
        setChecked(!checked);

        const twoFactorResult = await createTwoFactorMutation.mutateAsync();

        if (twoFactorResult.qrcode && twoFactorResult.link) {
            setTwoFactor(twoFactorResult);
            setDisabled(true);
        } else {
            setTwoFactor({});
        }
    }

    return (
        <div>
            <Switch disabled={disabled} className='mt-3' checked={checked} onChange={handleChange} height={25}></Switch>
            {twoFactor.qrcode &&
                <div className='mt-5'>
                    <Img alt='qrcode' width={160} height={160} src={twoFactor.qrcode}></Img>
                    <div className='mt-2 text-lg'>
                        <span className='dark:text-fontwhite'>Scanne nun diesen QR Code mit der Google Authenticator App</span>
                    </div>
                </div>
            }
        </div>
    );
}