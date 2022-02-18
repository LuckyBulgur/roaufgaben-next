import { FC } from 'react';

import { Link } from './nav';


const Footer: FC = () => {

    return (
        <div className='justify-between items-center flex-row-reverse pr-4 pl-4 max-h-12 pt-6 sm:flex ml-auto sm:max-w-7xl'>
            <ul className='list-none leading-none items-center sm:flex mb-3'>
                <Link href='/impressum'>Impressum</Link>
                <Link href='/privacy'>Datenschutz</Link>
            </ul>
        </div >
    );
}

export default Footer;