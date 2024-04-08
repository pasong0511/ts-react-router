export const routes = {
    home: {
        id: "home",
        path: "/",
        to: "/",
    },
    about: {
        id: "about",
        path: "/about",
        to: "/about",
    },
    section: {
        id: "section",
        path: "/section",
        to: "/section",
    },
    test: {
        id: "test",
        path: "/test/:id", // 동적 경로로 사용될 때의 경로 정의
        to: "/test", // Link 컴포넌트에서 사용할 기본 URL
    },
};
