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
    root: path.join(__app.__root.__routes, 'root'),
    index: path.join(__app.__root.__routes, 'index'),
    // dashboard: path.join(__app.__root.__routes, 'dashboard'),
    // survey: path.join(__app.__root.__routes, 'survey'),
    // workflow: path.join(__app.__root.__routes, 'workflow'),
    // search: path.join(__app.__root.__routes, 'search'),
    // admin: path.join(__app.__root.__routes, 'admin'),
    // mycronos: path.join(__app.__root.__routes, 'mycronos'),
    // entity: path.join(__app.__root.__routes, 'entity'),
};

//modules in dao folder
global.__app.__dao = {
    upload: path.join(__app.__root.__dao, 'uploadDao'),
    email: path.join(__app.__root.__dao, 'emailDao'),
    user: path.join(__app.__root.__dao, 'userDao'),
    // home: path.join(__app.__root.__dao, 'homeDao'),
    // dashboard: path.join(__app.__root.__dao, 'dashboardDao'),
    // case: path.join(__app.__root.__dao, 'caseDao'),
    // workflow: path.join(__app.__root.__dao, 'workflowDao'),
    // admin: path.join(__app.__root.__dao, "adminDao"),
    // role: path.join(__app.__root.__dao, "roleDao"),
    // user: path.join(__app.__root.__dao, "userDao"),
    // alert: path.join(__app.__root.__dao, "alertDao"),
    // entity: path.join(__app.__root.__dao, 'entityDao'),
};

//modules in services folder
global.__app.__services = {
    upload: path.join(__app.__root.__services, 'uploadService'),
    email: path.join(__app.__root.__services, 'emailService'),
    user: path.join(__app.__root.__services, 'userService'),
    // home: path.join(__app.__root.__services, 'homeService'),
    // dashboard: path.join(__app.__root.__services, 'dashboardService'),
    // case: path.join(__app.__root.__services, 'caseService'),
    // survey: path.join(__app.__root.__services, 'surveyService'),
    // workflow: path.join(__app.__root.__services, 'workflowService'),
    // admin: path.join(__app.__root.__services, 'adminService'),
    // role: path.join(__app.__root.__services, 'roleService'),
    // readOnly: path.join(__app.__root.__services, 'readOnlyService'),
    // assignment: path.join(__app.__root.__services, 'assignmentService'),
    // user: path.join(__app.__root.__services, 'userService'),
    // alert: path.join(__app.__root.__services, 'alertService'),
    // entity: path.join(__app.__root.__services, 'entityService'),
    // notes: path.join(__app.__root.__services, 'notesService'),
    // task: path.join(__app.__root.__services, 'taskService'),
};

//modules in apis folder
global.__app.__apis = {
    email: path.join(__app.__root.__apis, 'emailAPI'),
    upload: path.join(__app.__root.__apis, 'uploadAPI'),
    user: path.join(__app.__root.__apis, 'userAPI'),
    root: path.join(__app.__root.__apis, 'rootAPI'),
    // dashboard: path.join(__app.__root.__apis, 'dashboardAPI'),
    // survey: path.join(__app.__root.__apis, 'surveyAPI'),
    // workflow: path.join(__app.__root.__apis, 'workflowAPI'),
    // role: path.join(__app.__root.__apis, 'roleAPI'),
    // assignment: path.join(__app.__root.__apis, 'assignmentAPI'),
    // user: path.join(__app.__root.__apis, 'userAPI'),
    // alert: path.join(__app.__root.__apis, 'alertAPI'),
    // search: path.join(__app.__root.__apis, 'searchAPI'),
    // notes: path.join(__app.__root.__apis, 'notesAPI'),
    // task: path.join(__app.__root.__apis, 'taskAPI'),
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
    // workflow: path.join(__app.__root.__rest, 'workflowFaastDao'),
    // assignment: path.join(__app.__root.__rest, 'assignmentFaastDao'),
    // alert: path.join(__app.__root.__rest, 'alertFaastDao'),
    // user: path.join(__app.__root.__rest, 'userFaastDao'),
    // notes: path.join(__app.__root.__rest, 'notesFaastDao'),
    // correspondence: path.join(__app.__root.__rest, 'correspondenceFaastDao'),
    // task: path.join(__app.__root.__rest, 'taskFaastDao')
};

global.__app.__utils = {
    rp: path.join(__app.__root.__utils, 'requestClient'),
    jwt: path.join(__app.__root.__utils, 'jwt'),
    format: path.join(__app.__root.__utils, 'format'),
    loginedIn: path.join(__app.__root.__utils, 'loggedIn'),
    renderUtil: path.join(__app.__root.__utils, 'renderUtil'),
    log: path.join(__app.__root.__utils, 'log')
};


//global variables
// global.login_page_url = faast_url + app_name.toLowerCase() + '-login';
global.jwt_name = 'jwt-' + APP_NAME;
