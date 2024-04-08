export const matchPath = (path: string, url: string) => {
    const pathParts = path.split("/").filter(Boolean);
    const urlParts = url.split("/").filter(Boolean);

    if (pathParts.length !== urlParts.length) {
        return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        const urlPart = urlParts[i];

        // 경로에 :로 시작하는 부분이 있다면 매개변수로 인식
        if (pathPart.startsWith(":")) {
            params[pathPart.slice(1)] = urlPart;
        } else if (pathPart !== urlPart) {
            // 정적 경로 부분이 다르면 매칭 실패
            return null;
        }
    }

    return { path, params };
};
