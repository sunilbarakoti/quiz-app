/**
 * In case of any incorrect path, the users are responded with 404 status code.
**/

exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
