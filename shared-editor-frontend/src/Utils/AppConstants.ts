const AppConstants = {
    API_HOST: process.env.API_HOST || "localhost",
    API_PORT: process.env.API_PORT || 8080,
    API_URL: ""
};

AppConstants.API_URL = `http://${AppConstants.API_HOST}:${AppConstants.API_PORT}/api`;

export default AppConstants;
