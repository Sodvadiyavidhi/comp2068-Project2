// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = 'languages';
const Language = require('../models/Language');
const User = require('../models/User');
exports.index = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const languages = await Language
      .find({user: user._id})
      .populate('user')
      .sort({updatedAt: 'desc'});
    res.render(`${viewPath}/index`, {
      pageTitle: 'Registered Language',
      languages: languages
    });
  } catch (error) {
    req.flash('danger', `Opps!!Unable to display: ${error}`);
    res.redirect('/');
  }
};
exports.show = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id)
    .populate('user');
    res.render(`${viewPath}/show`, {
      pageTitle: language.title,
      language: language
    });
  } catch (error) {
    req.flash('danger', `Opps!!Unable to display the registered language: ${error}`);
    res.redirect('/');
  }
};
exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Language'
  });
};
exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const language = await Language.create({user: user._id, ...req.body});
    req.flash('success', 'You are successfully registered.');
    res.redirect(`/languages/${language.id}`);
  } catch (error) {
    req.flash('danger', `Opps!!Unable to register for the course: ${error}`);
    req.session.formData = req.body;
    res.redirect('/languages/new');
  }
};
exports.edit = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    console.log(language);
    res.render(`${viewPath}/edit`, {
      pageTitle: language.title,
      formData: language
    });
  } catch (error) {
    req.flash('danger', `Opps!!Unable to find the course: ${error}`);
    res.redirect(`/`);
  }
};
exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    let language = await Language.findById(req.body.id);
    if (!language) throw new Error('User cannot be found.');
    const attributes = {user: user._id, ...req.body};
    await Language.validate(attributes);
    await Language.findByIdAndUpdate(attributes.id, attributes);
    req.flash('success', 'The course is successfully updated.');
    res.redirect(`/languages/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `Opps!!Unable to update the course: ${error}`);
    res.redirect(`/languages/${req.body.id}/edit`);
  }
};
exports.delete = async (req, res) => {
  try {
    await Language.deleteOne({_id: req.body.id});
    req.flash('success', 'The course is succesfully deleted.');
    res.redirect(`/languages`);
  } catch (error) {
    req.flash('danger', `Opps!!Unable to delete the course: ${error}`);
    res.redirect(`/languages`);
  }
};