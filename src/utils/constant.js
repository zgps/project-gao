export const SYSTEM = {
    BASE_URL: '/',
    PREFIX_API_URL: '/api',
    TIMEOUT: 2000,
};

export const validator = {
	telephone: /^(1[3-9])[0-9]{9}$/,
	pwd: /^(?![^a-zA-Z]+$)(?!\D+$)[a-zA-Z\d]{6,16}$/,
	pwd2: /^(?![^a-zA-Z]+$)(?!\D+$)[a-zA-Z\d]{6,16}$/,
	oldPwd: /^(?![^a-zA-Z]+$)(?!\D+$)[a-zA-Z\d]{6,16}$/,
};