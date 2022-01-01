import Nav, { Title, Links, Link } from '../components/nav';
import { FC, HTMLProps } from 'react';

const Header: FC<HTMLProps<HTMLHeadElement>> = (props) => {
    return (
        <header className="w-screen">
            <Nav>
                <Title>{props.title}</Title>
                <Links>
                    <Link href="/imprint">Platzhalter</Link>
                    <Link href="/login">Anmelden</Link>
                </Links>
            </Nav>
        </header>
    )
}

export default Header;