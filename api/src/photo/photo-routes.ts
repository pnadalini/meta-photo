import express, { NextFunction, Request, Response } from "express";
import * as photoService from "./photo-service";
import { photoFiltersSchema } from "./photo-schemas";
import { PhotoQueryFilters } from "./interfaces";
import { validateQuery } from "../utils/validation-middleware";

const router = express.Router();

type FilterRequest = Request<unknown, unknown, unknown, PhotoQueryFilters>;

router.get(
  "/",
  validateQuery(photoFiltersSchema),
  async (req: FilterRequest, res: Response, next: NextFunction) => {
    const {
      title,
      "album.title": albumTitle,
      "album.user.email": email,
      limit,
      offset,
    } = req.query;

    try {
      const response = await photoService.getFilteredPhotos({
        title,
        albumTitle,
        email,
        limit,
        offset,
      });

      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const photoId = req.params.id;

  try {
    const enrichedPhoto = await photoService.getPhoto(Number(photoId));

    res.json(enrichedPhoto);
  } catch (error) {
    next(error);
  }
});

export default router;
