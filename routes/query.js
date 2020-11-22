const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
// const auth = require('../../middleware/auth');
// const Product = require('../../models/Product')

// @route   POST api/product
// @desc    Create a product
// @access  Private

router.post("/",
    [
        check('query', 'Enter a valid query.')
            .not()
            .isEmpty(),

    ],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
      }

      try {
          const { query } = req.body;
          const res = await client.query(query);
          console.log(res.rows[0]);
          res.json({rows: res.rows});
      } catch (err) {
          console.error(err.message);
          res.status(500).json([{msg: 'Server Error'}]);
      }
    }

)

// @route   GET api/product
// @desc    Get all products
// @access  Private

// router.get("/", auth, async (req, res) => {
//     try {
//         const products = await Product.find({user: req.user.id}).sort({name:1});
//         res.json(products);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({msg: 'Server error'});
//     }
// })
