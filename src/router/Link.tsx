import { history } from "./Router";

interface ILinkProps {
    to: string;
    children?: React.ReactNode;
    params?: any;
}

function Link({ to, children, params = {} }: ILinkProps) {
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        history.push(to);
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;
