import express, { NextFunction, Request, Response } from "express";
import { axios, axiosInstance } from "../utils/axios-config";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const [photosResponse, albumsResponse, usersResponse] = await Promise.all([
    axiosInstance.get("photos"),
    axiosInstance.get("albums"),
    axiosInstance.get("users"),
  ]);

  res.json(photosResponse.data);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photoId = req.params.id;

    const photoResponse = await axiosInstance.get(`photos/${photoId}`);
    const photo = photoResponse.data;

    const albumResponse = await axiosInstance.get(`albums/${photo.albumId}`);
    const album = albumResponse.data;

    const userResponse = await axiosInstance.get(`users/${album.userId}`);
    const user = userResponse.data;

    delete photo.albumId;
    delete album.userId;

    const enrichedPhoto = {
      ...photo,
      album: {
        ...album,
        user,
      },
    };

    res.json(enrichedPhoto);
  } catch (error) {
    next(error);
  }
});

export default router;
