var path = require('path');

global.__app = {};

//root folders
global.__app.__root = {
    __routes: path.join(__dirname, 'routes'),
    __dao: path.join(__dirname, 'dao'),
    __rest: path.join(__dirname, 'rest'),
    __services: path.join(__dirname, 'services'),
    __apis: path.join(__dirname, 'apis'),
    __filters: path.join(__dirname, 'filters'),
    __utils: path.join(__dirname, 'utils'),
};

//modules in routes folder
global.__app.__routes = {
    upload: path.join(__app.__root.__routes, 'upload'),
    email: path.join(__app.__root.__routes, 'email'),
    user: path.join(__app.__root.__routes, 'user'),
    sms: path.join(__app.__root.__routes, 'sms'),
    survey: path.join(__app.__root.__routes, 'survey'),
    root: path.join(__app.__root.__routes, 'root'),
    index: path.join(__app.__root.__routes, 'index'),
    about: path.join(__app.__root.__routes, 'about'),
};

//modules in dao folder
global.__app.__dao = {
    upload: path.join(__app.__root.__dao, 'uploadDao'),
    email: path.join(__app.__root.__dao, 'emailDao'),
    user: path.join(__app.__root.__dao, 'userDao'),
    sms: path.join(__app.__root.__dao, 'smsDao'),
    about: path.join(__app.__root.__dao, 'aboutDao'),
};

//modules in services folder
global.__app.__services = {
    upload: path.join(__app.__root.__services, 'uploadService'),
    email: path.join(__app.__root.__services, 'emailService'),
    user: path.join(__app.__root.__services, 'userService'),
    sms: path.join(__app.__root.__services, 'smsService'),
    about: path.join(__app.__root.__services, 'aboutService'),
};

//modules in apis folder
global.__app.__apis = {
    email: path.join(__app.__root.__apis, 'emailAPI'),
    upload: path.join(__app.__root.__apis, 'uploadAPI'),
    user: path.join(__app.__root.__apis, 'userAPI'),
    root: path.join(__app.__root.__apis, 'rootAPI'),
    sms: path.join(__app.__root.__apis, 'smsAPI'),
    about: path.join(__app.__root.__apis, 'aboutAPI'),
};

//modules in filters folder
global.__app.__filters = {
    responseRender: path.join(__app.__root.__filters, '/responseFilter/responseRender'),
    responseHandler: path.join(__app.__root.__filters, '/responseFilter/responseHandler'),
    codeMapping: path.join(__app.__root.__filters, '/responseFilter/codeMapping'),
    filters: path.join(__app.__root.__filters, '/requestFilter/filters'),
    initFilter: path.join(__app.__root.__filters, '/requestFilter/initFilter'),
    jwtFilter: path.join(__app.__root.__filters, '/requestFilter/jwtFilter'),
    xssFilter: path.join(__app.__root.__filters, '/requestFilter/xssFilter')
};

global.__app.__rests = {
    // survey: path.join(__app.__root.__rest, 'surveyFaastDao'),
};

global.__app.__utils = {
    rp: path.join(__app.__root.__utils, 'requestClient'),
    jwt: path.join(__app.__root.__utils, 'jwt'),
    format: path.join(__app.__root.__utils, 'format'),
    loginedIn: path.join(__app.__root.__utils, 'loggedIn'),
    renderUtil: path.join(__app.__root.__utils, 'renderUtil'),
    log: path.join(__app.__root.__utils, 'logTracer')
};


//global variables
// global.login_page_url = faast_url + app_name.toLowerCase() + '-login';
global.jwt_name = 'jwt-' + APP_NAME;
