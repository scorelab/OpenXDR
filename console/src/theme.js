export const defaultTheme = {
    palette: {
        primary: {
            main: "#222",
        },
        secondary: {
            main: '#304ffe',
        },
        success: {
            main: '#9ccc65',
            contrastText: '#fff',
        },
        error: {
            main: '#ef5350',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                },
            },
        },
    },
}