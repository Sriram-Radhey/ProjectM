import e from 'express';
import { messageSend,getMessages } from '../Controller/messageController.js';
import routeProtect  from '../middleware/routeProtect.js';

const router = e.Router();

router.get("/:id",routeProtect, getMessages);
router.post("/send/:id",routeProtect, messageSend);


export default router;