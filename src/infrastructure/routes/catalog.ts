import express, { Request, Response } from "express";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import { FindStoreCatalogFacadeInputDto } from "../../modules/store-catalog/facade/store-catalog.facade.interface";


const catalogRouter = express.Router();

catalogRouter.get("/:id", async (req: Request, res: Response) => {

  try {
    const facade = StoreCatalogFacadeFactory.create();

    const input: FindStoreCatalogFacadeInputDto = {
      id: req.params.id as string,
    };


    const result = await facade.find(input);

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

catalogRouter.get("/", async (req: Request, res: Response) => {

  try {
    const facade = StoreCatalogFacadeFactory.create();

    const result = await facade.findAll();

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default catalogRouter;