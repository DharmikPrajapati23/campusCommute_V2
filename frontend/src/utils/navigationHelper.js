// A ref to React Router's navigate function, set from inside the app
let _navigate = null;

export const setNavigator = (navigateFn) => {
  _navigate = navigateFn;
};

export const navigateTo = (path) => {
  if (_navigate) {
    _navigate(path);
  } else {
    window.location.href = path; // fallback
  }
};
