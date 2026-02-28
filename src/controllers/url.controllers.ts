import { Request, Response } from "express";
import { urlServices } from "../services/url.services";

export class urlController {
  static async createUrl(req: Request, res: Response) {
    const url = req.body.url;

    try {
      if (url === undefined || url.trim().length === 0) {
        throw new Error("Url is reqired");
      }
      const result = await urlServices.createService(url);
      res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }
  static async getUrl(req: Request, res: Response) {
    const url = req.params.url as string;
    try {
      const result = await urlServices.getService(url);
      res.status(200).json(result);
      //res.redirect(result.url);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
  static async putUrl(req: Request, res: Response) {
    const shortUrl = req.params.url as string;
    const { url } = req.body;
    try {
      if (url === undefined || url.trim().length === 0) {
        return res.status(400).json({ message: "Url is required" });
      }
      const result = await urlServices.putService(shortUrl, url);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
  static async deleteUrl(req: Request, res: Response) {
    try {
      const url = req.params.url as string;
      const result = await urlServices.deleteService(url);
      if (result === 1) {
        res.status(204);
        res.json({ message: "successfully deleted" });
      }
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
  static async getStats(req: Request, res: Response) {
    const url = req.params.url as string;
    try {
      const result = await urlServices.getStats(url);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 404).json({ message: error.message });
    }
  }
}
