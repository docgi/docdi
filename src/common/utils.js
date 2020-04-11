export const isSubDomain = subDomain => {
  let appDomain = process.env.VUE_APP_DOMAIN;
  let regex = RegExp(
    "^(http(s)?://)?[a-zA-Z0-9\\-]{1,40}." + appDomain + "(:[0-9]{2,4})?$"
  );
  return regex.test(subDomain);
};

export const isParentOrigin = parentOrigin => {
  if (parentOrigin) {
    let protocol = location.protocol + "//";
    let currentOrigin = location.host;
    parentOrigin = parentOrigin.substring(protocol.length);
    return currentOrigin.endsWith(parentOrigin);
  }
  return false;
};

export const listWorkspaces = () => {
  let _workspaces = localStorage.getItem(REMEMBER_WORKSPACES_KEY);
  try {
    return JSON.parse(_workspaces);
  } catch (e) {
    return []
  }
};

export const REMEMBER_WORKSPACES_KEY = "workspaces";
export const rememberWorkspace = workspace => {
  if (workspace) {
    let workspaces = listWorkspaces();
    if (!(workspaces instanceof Array)) {
      workspaces = []
    }
    workspaces.push(workspace);
    localStorage.setItem(REMEMBER_WORKSPACES_KEY, JSON.stringify(workspaces))
  }
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const buildFullSubDomain = (subDomain) => {
  return `${location.protocol}//${subDomain}.${location.host}`;
};

export const getMainAppDomain = () => {
  let currentHost = location.host;
  let excludeSubDomain = currentHost.substr(currentHost.search(process.env.VUE_APP_DOMAIN));
  return `${location.protocol}//${excludeSubDomain}`;
};

export const workspaceNameFromHost = () => {
  return location.host.split('.')[0];
};

export const currentWindowWidth = () => {
  return window.innerWidth;
};

export const isValidEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isEscKey = (kbEvent) => {
  return kbEvent.key === "Escape";
};
