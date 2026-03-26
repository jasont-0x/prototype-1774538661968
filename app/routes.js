const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/travel-date', function (req, res) {
  res.render('travel-date')
})

router.post('/travel-date', function (req, res) {
  const answer = req.session.data['travel-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'travel-date': 'Select when you need to travel.' }
    return res.render('travel-date')
  }
  if (answer === 'two-weeks') {
    return res.redirect('/passport-type')
  } else if (answer === 'three-weeks') {
    return res.redirect('/passport-type')
  } else if (answer === 'more-than-three-weeks') {
    return res.redirect('/ineligible-travel-date')
  }
  res.redirect('/passport-type')
})

router.get('/ineligible-travel-date', function (req, res) {
  res.render('ineligible-travel-date')
})

router.get('/passport-type', function (req, res) {
  res.render('passport-type')
})

router.post('/passport-type', function (req, res) {
  const answer = req.session.data['passport-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'passport-type': 'Select what type of passport you have.' }
    return res.render('passport-type')
  }
  if (answer === 'adult') {
    return res.redirect('/passport-condition')
  } else if (answer === 'child') {
    return res.redirect('/ineligible-passport-type')
  }
  res.redirect('/passport-condition')
})

router.get('/ineligible-passport-type', function (req, res) {
  res.render('ineligible-passport-type')
})

router.get('/passport-condition', function (req, res) {
  res.render('passport-condition')
})

router.post('/passport-condition', function (req, res) {
  const answer = req.session.data['passport-condition']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'passport-condition': 'Select if your passport is damaged.' }
    return res.render('passport-condition')
  }
  if (answer === 'damaged') {
    return res.redirect('/ineligible-passport-condition')
  } else if (answer === 'not-damaged') {
    return res.redirect('/location-preference')
  }
  res.redirect('/location-preference')
})

router.get('/ineligible-passport-condition', function (req, res) {
  res.render('ineligible-passport-condition')
})

router.get('/location-preference', function (req, res) {
  res.render('location-preference')
})

router.post('/location-preference', function (req, res) {
  const answer = req.session.data['location-preference']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'location-preference': 'Select your preferred appointment location.' }
    return res.render('location-preference')
  }
  if (answer === 'london') {
    return res.redirect('/contact-details')
  } else if (answer === 'glasgow') {
    return res.redirect('/contact-details')
  } else if (answer === 'newport') {
    return res.redirect('/contact-details')
  } else if (answer === 'peterborough') {
    return res.redirect('/contact-details')
  } else if (answer === 'liverpool') {
    return res.redirect('/contact-details')
  } else if (answer === 'belfast') {
    return res.redirect('/contact-details')
  } else if (answer === 'durham') {
    return res.redirect('/contact-details')
  }
  res.redirect('/contact-details')
})

router.get('/contact-details', function (req, res) {
  res.render('contact-details')
})

router.post('/contact-details', function (req, res) {
  const answer = req.session.data['contact-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-details': 'Enter your phone number.' }
    return res.render('contact-details')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('UPA')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
