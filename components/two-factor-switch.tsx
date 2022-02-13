import { Switch } from 'evergreen-ui';
import Image from 'next/image';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { MobileView } from 'react-device-detect';

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
                <>
                    <Image alt='qrcode' className='h-40 w-40 mt-5' src={twoFactor.qrcode}></Image>
                    <div className='mt-2 text-lg'>
                        <span className='text-fontwhite'>Scanne nun diesen QR Code mit der Google Authenticator App</span>
                    </div>
                    <MobileView>
                        <a className='text-fontwhite' href={twoFactor.link}>Oder klicke hier</a>
                    </MobileView>
                </>
            }
        </div>
    );
}