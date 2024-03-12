import { Router } from 'express';

import { create, find, list } from '../controllers/character';

const characterRouter = Router();

characterRouter.get('/', list);
characterRouter.get('/:id', find);
characterRouter.post('/', create);

export default characterRouter;