import { Router } from 'express';
import { artAssetRouter } from './artAsset.router';

const router = Router();

router.use('/art-asset', artAssetRouter)

export { router as routes };