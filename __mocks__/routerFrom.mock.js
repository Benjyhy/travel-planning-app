jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: {
                point: "from",
            },
            asPath: "",
        };
    },
}));
