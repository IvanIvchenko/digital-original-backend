import { Router } from 'express';
import { ArtAssetController } from 'controllers/artAsset.controller';
import { ArtAssetService } from 'services/artAsset.service';

const artAssetController = new ArtAssetController(new ArtAssetService());

const artAssetRouter = Router();

artAssetRouter.get(
  '/:id',
  artAssetController.findOne.bind(artAssetController),
);

export { artAssetRouter }