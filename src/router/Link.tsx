import { history } from "./Router";

interface ILinkProps {
    to: string;
    children?: React.ReactNode;
    params?: any;
}

function Link({ to, children, params = {} }: ILinkProps) {
    // 동적 경로를 처리하고, 필요한 경우 params 객체에서 실제 값을 가져와 치환합니다.
    const path = Object.keys(params).reduce(
        (accumulatedPath, param) =>
            accumulatedPath.replace(`:${param}`, params[param]),
        to
    );

    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        history.push(path);
    };

    return (
        <a href={path} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;
