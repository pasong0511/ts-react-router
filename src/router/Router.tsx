import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { RouterContext } from "context/RouterContext";
import Link from "./Link";
import Route from "./Route";

export interface IRoutesProps {
    id: string;
    path: string;
    to: string;
    params?: Record<string, string>;
}

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

    return (
        <RouterContext.Provider value={{ path: currentPath }}>
            {children}
        </RouterContext.Provider>
    );
}

export { Router, Route, Link, history };
