export const API = {
    LOGIN: "/api/authenticate/primary/password/prove/",
    PASSWORD_RESET: "/api/authenticate/password_reset/init/",
}

export const ALERTS = {
    invalidEmail: () => "Please enter a valid email address.",
    invalidCredentials: () => "We couldn't log you in. Please check your email address and password and try again.",
    noSSOProvider: () => "We could not find any SSO provider based on that email address.",
}

export const ROUTES = {
    PASSWORD_RESET: "/password/reset/",
}

export const TRANSLATIONS = {
    Italian: {
        login: () => "Accedere"
    },
    French: {
        login: () => "S'identifier"
    },
    German: {
        login: () => "Anmelden"
    }
}