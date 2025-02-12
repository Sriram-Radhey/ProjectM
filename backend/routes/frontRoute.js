import e from 'express';

import routeProtect from '../middleware/routeProtect.js';
import { getuserSide } from '../Controller/frontController.js';

const router =  e.Router();

router.get("/",routeProtect,getuserSide);

export default router;