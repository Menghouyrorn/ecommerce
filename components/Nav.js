import ActiveLink from "./ActiveLink";


const Nav = () => {
    return (
        <nav>
            <style jsx>{`
            .nav-link{
                text.decoration:none;
            }
            .active:after{
                content : '(Hello)';
            }

            `}</style>
            <ul className="nav">
                <li>
                    <ActiveLink activeClassName="active" href="/">
                        <a className="nav-link">Home</a>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink activeClassName="active" href="/first">
                        <a className="nav-link">About</a>
                    </ActiveLink>

                </li>
                <li>
                    <ActiveLink activeClassName="active" href="/hook">
                        <a className="nav-link">Hook</a>
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink activeClassName="active" href="/[slug]" as="/dynamic-route">
                        <a className="nav-link">Dynamic route</a>
                    </ActiveLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;