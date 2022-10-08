import express from 'express';

import User from '../models/user.js';
import Subscription from '../models/subscription.js';
import Listing from '../models/listing.js'
import Land from '../models/land.js'
import Venue from '../models/venue.js'

const router = express.Router();


// get user
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    // check if id is type objectId
   if (!(userId.match(/^[0-9a-fA-F]{24}$/))) return res.status(400).json({ error: 'invalid user id' });
    try {
      const user = await User.findOne({ _id: userId });
      const userObj = user.toObject();
      // return them
      return res.status(200).json(userObj); 
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  });

  // check user subs
  router.get('/:id/subscription-status', async (req, res) => {
    const userId = req.params.id;
    // check if id is type objectId
   if (!(userId.match(/^[0-9a-fA-F]{24}$/))) return res.status(400).json({ error: 'invalid user id' });
    try {
      const sub = await Subscription.findOne({ userId: userId });
      if (!sub) return res.status(200).json(false);
      const subObj = sub.toObject();
      // return them
      return res.status(200).json(subObj.status); 
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  });

  // count user properties
  router.get('/:id/count-props', async (req, res) => {
    const userId = req.params.id;
    // check if id is type objectId
   if (!(userId.match(/^[0-9a-fA-F]{24}$/))) return res.status(400).json({ error: 'invalid user id' });
    try {
      // count  properties
     const listings = await Listing.countDocuments({hostId:userId});
     const lands = await Land.countDocuments({hostId:userId});
     const venues = await Venue.countDocuments({hostId:userId});
     const total = listings + lands + venues;
      // return them
      return res.status(200).json(total); 
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  });
  

  export default router;