import { FC, HTMLProps } from 'react';

import Nav, { Link, Links, Title } from '../components/nav';

const Header: FC<HTMLProps<HTMLHeadElement>> = (props) => {
    return (
        <header className="w-screen">
            <Nav>
                <Title>{props.title}</Title>
                <Links>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/login">Anmelden</Link>
                </Links>
            </Nav>
        </header>
    )
}

export default Header;