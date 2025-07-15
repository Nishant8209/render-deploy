"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["No_Content"] = 204] = "No_Content";
    StatusCode[StatusCode["Found"] = 302] = "Found";
    StatusCode[StatusCode["Moved_Permanently"] = 301] = "Moved_Permanently";
    StatusCode[StatusCode["Not_Modified"] = 304] = "Not_Modified";
    StatusCode[StatusCode["Bad_Request"] = 400] = "Bad_Request";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["Not_Found"] = 404] = "Not_Found";
    StatusCode[StatusCode["Conflict"] = 409] = "Conflict";
    StatusCode[StatusCode["Unprocessable_Entity"] = 422] = "Unprocessable_Entity";
    StatusCode[StatusCode["Internal_Server_Error"] = 500] = "Internal_Server_Error";
    StatusCode[StatusCode["Not_Implemented"] = 501] = "Not_Implemented";
    StatusCode[StatusCode["Bad_Gateway"] = 502] = "Bad_Gateway";
    StatusCode[StatusCode["Service_Unavailable"] = 503] = "Service_Unavailable";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
// 200 OK: The request has succeeded (commonly used for successful GET, POST, PUT, PATCH requests).
// 201 Created: The request has succeeded, and a new resource has been created (used with POST requests).
// 204 No Content: The server successfully processed the request but is not returning any content (often used for DELETE requests).
// 301 Moved Permanently: The requested resource has been permanently moved to a new URL.
// 302 Found: The requested resource resides temporarily at a different URL (commonly used for redirects).
// 304 Not Modified: Indicates that the resource has not been modified since the last request (used with caching).
// 400 Bad Request: The server cannot process the request due to client error (e.g., malformed request syntax).
// 401 Unauthorized: Authentication is required and has failed or has not been provided.
// 403 Forbidden: The server understands the request, but it refuses to authorize it (access is denied).
// 404 Not Found: The requested resource could not be found on the server.
// 409 Conflict: Indicates a request conflict with the current state of the resource (e.g., attempting to create a duplicate resource).
// 422 Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors (often used for validation errors).
// 500 Internal Server Error: A generic error message indicating that the server encountered an unexpected condition.
// 501 Not Implemented: The server does not support the functionality required to fulfill the request.
// 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
// 503 Service Unavailable: The server is currently unable to handle the request due to temporary overload or maintenance.
