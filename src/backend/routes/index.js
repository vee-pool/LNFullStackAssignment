const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator')

const userService = require('../services/users')

router.post('/users', [
  body('email', 'Email is required.').not().isEmpty(),
  body('name', 'Name is required.').not().isEmpty(),
  body('role', 'Role is required.').not().isEmpty(),
  body('email', 'Email format is not correct.').isEmail(),
  body('email').custom(value => {
    return userService.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  body('name', 'Name must be only alphabetical.').isAscii(),
  body('status', 'Status does not belong to Active/Inactive/Pending').optional().isIn(['Active', 'Inactive', 'Pending']),
  body('role', 'Role does not belong to Admin / Customer Executive.').isIn(['Customer Executive', 'Admin']),
  body('mobile_no', 'Mobile number is invalid.').optional().isMobilePhone()
], async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userdata = req.body;
  
  try {
    const { user } = await userService.createUser(userdata);

    return res.json({
      'data': user
    });
  } catch (error) {
    return res.status(500);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const usersData = await userService.getAll();

    return res.json(usersData);
  } catch (error) {
    return res.status(500);
  }
});

router.delete('/users/:id', [
  param('id', 'User id must be integer').isInt()
], async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    await userService.deleteUser(req.params.id);
    return res.json({
      data: 'delete success'
    })
  } catch (error) {
    return res.status(500);
  }
})

router.patch('/users/:id', [
  param('id', 'User id must be integer').isInt(),
  body('email', 'Email format is not correct.').optional().isEmail(),
  body('role', 'Role does not belong to Admin / Customer Executive.').optional().isIn(['Customer Executive', 'Admin']),
  body('mobile_no', 'Mobile number is invalid.').optional().isMobilePhone(),
  body('name', 'Name must be only alphabetical.').optional().isAscii(),
  body('status', 'Status does not belong to Active/Inactive/Pending').optional().isIn(['Active', 'Inactive', 'Pending']),
  body('email').optional().custom(value => {
    return userService.findByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
], async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let userData = req.body;

    let userId = parseInt(req.params.id);

    await userService.updateUser(userId, userData);

    return res.json({
      data: 'update success'
    });
  } catch (error) {
    return res.status(500);
  }
})

module.exports = router;
