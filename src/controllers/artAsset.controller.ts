import { Request, NextFunction, Response } from 'express';
import { ArtAssetService } from 'services/artAsset.service';
import { ArtAssetRequestParams } from 'utils/interfaces';

export class ArtAssetController {
  private artAssetService: ArtAssetService;

  constructor(artAssetService: ArtAssetService) {
    this.artAssetService = artAssetService;
  }

  async findOne(
    req: Request<ArtAssetRequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const artAsset = await this.artAssetService.findOne(req.params.id);
      res.status(200).json(artAsset);
    } catch (err) {
      console.error(`Error while trying to fetch art asset:`, err);
      next(err);
    }
  }

}