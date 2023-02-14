Object.defineProperty(window.navigator, "geolocation", {
    writable: true,
    value: {
        clearWatch: jest.fn(),
        getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
            Promise.resolve(
                success({
                    coords: {
                        latitude: 51.1,
                        longitude: 45.3,
                    },
                })
            )
        ),
    },
});
