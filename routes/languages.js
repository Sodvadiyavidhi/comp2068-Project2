const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/LanguagesController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  // put your routes here
  router.get('/languages', index);
  router.get('/languages/new',auth, _new);
  router.post('/languages',auth, create); 
  router.post('/languages/update',auth, update); 
  router.post('/languages/delete',auth, _delete); 
  router.get('/languages/:id/edit',auth, edit); 
  router.get('/languages/:id', show);
};