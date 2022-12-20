export const loginSelectors = {
    inputs: {
        email: 'input[id=email]',
        password: 'input[id="password"]',
    },
    buttons: {
        login: 'button[type="submit"]',
        showHide: 'i[aria-label="show or hide password"]',
        forgotPassword: 'button[class="PrimaryLogin_forgotPasswordAction__VPXKh"]',
        ssoLogin: 'div.AlternativeAction_container__17A_K > button',
        getHelp: 'button[class="GetHelpAction_action__4N6WO"]',
        loginWithPassword: 'button.SSOLogin_loginWithPasswordAction___1aBy',
        loginWithSSO: '.SSOForm_actions__2_5Z_ > .ant-btn',
        inputClear: '.ant-input-clear-icon'
    },
    links: {
        requestDemo: 'a[class="RequestDemoAction_link__GwUR1"]',
    },
    dropdowns: {
        languagePicker: 'div[class="LanguageSwitcher_container__bwBG7"]',
    },
    containers: {
        titleBox: '.ContentBoxTitle_heading__ryO0N',
    },
}