import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { RouterContext } from "context/RouterContext";
import Link from "./Link";
import Route from "./Route";
import { IRoutesProps } from "App";
import { matchPath } from "utils/matchPath";
import { NotFound } from "component/NotFound";

interface IRouteProps {
    children: React.ReactNode;
    routes: { [key: string]: IRoutesProps };
}

//브라우저의 세션 히스토리를 관리하는 객체를 생성
const history = createBrowserHistory();

function Router({ children, routes }: IRouteProps) {
    //currentPath 상태는 애플리케이션의 현재 경로를 저장
    //초기값 브라우저의 현재 위치 (window.location.pathname)를 사용
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        // history 객체를 사용하여 경로 변경을 감시
        //경로가 변경될 때마다 (history.listen 콜백 함수가 호출
        const unlisten = history.listen(({ location }) => {
            //경로 업데이트 될때마다,
            //currentPath 상태를 업데이트
            setCurrentPath(location.pathname);
        });

        return () => {
            unlisten();
        };
    }, []);

    // NotFound 여부를 판단하는 로직을 개선합니다.
    const checkPathAgainstRoutes = (
        path: string,
        routes: { [key: string]: IRoutesProps }
    ) => {
        return Object.values(routes).some((route) =>
            matchPath(route.path, path)
        );
    };

    const isNotFound = !checkPathAgainstRoutes(currentPath, routes);

    //currentPath를 컨텍스트 값으로 제공
    //이 컨텍스트 내의 모든 컴포넌트가 현재 경로에 접근
    return (
        <RouterContext.Provider value={{ path: currentPath }}>
            {isNotFound ? <NotFound /> : children}
        </RouterContext.Provider>
    );
}

export { Router, Route, Link, history };
