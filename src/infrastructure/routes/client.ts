import express, { Request, Response } from "express";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/client-adm/facade/client-adm.facade.interface";
import Address from "../../modules/@shared/domain/value-object/address/address.value-object";


const clientRouter = express.Router();

clientRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = ClientAdmFacadeFactory.create();

    const input: AddClientFacadeInputDto = {
      id: req.body.id as string,
      name: req.body.name as string,
      email: req.body.email as string,
      document: req.body.document as string,
      address: req.body.address as any
    };

    const result = await facade.add(input);

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

clientRouter.get("/:id", async (req: Request, res: Response) => {

  try {
    const facade = ClientAdmFacadeFactory.create();

    const id = req.params.id as string;

    const result = await facade.find({ id: id });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default clientRouter;