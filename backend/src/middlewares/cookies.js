const cookiesMiddleware = async (req, res, next) => {
  req.getCookie = (name) => {
    return req.cookies[name] || null;
  };

  res.setCookie = (name, value) => {
    res.cookie(name, value, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      partitioned: true,
    });
  };

  res.removeCookie = (name) => {
    res.cookie(name, '', {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      partitioned: true,
      expires: new Date(0),
    });
  };

  next();
};

export default cookiesMiddleware;

