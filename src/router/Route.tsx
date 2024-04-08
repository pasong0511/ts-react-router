import { useContext } from "react";

import { RouterContext } from "../context/RouterContext";
import { matchPath } from "utils/matchPath";

interface IRouteProps {
    path: string;
    children?:
        | React.ReactNode
        | ((params: Record<string, any>) => React.ReactNode);
}

//path prop이 현재 경로 (currentPath)와 일치할 때만 자식 컴포넌트를 렌더링
function Route({ path, children }: IRouteProps) {
    const { path: currentPath } = useContext(RouterContext);

    const match = matchPath(path, currentPath);

    // 매치 실패 시 바로 null 반환
    if (!match) {
        return null;
    }

    // 그렇지 않으면 자식 컴포넌트 직접 렌더링
    return currentPath === path ? <>{children}</> : null;
}

export default Route;
