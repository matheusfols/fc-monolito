import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";


const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = ProductAdmFacadeFactory.create();

    const input: AddProductFacadeInputDto = {
      name: req.body.name as string,
      description: req.body.description as string,
      purchasePrice: Number(req.body.purchasePrice),
      salesPrice: Number(req.body.salesPrice),
      stock: Number(req.body.stock),
    };


    const result = await facade.addProduct(input);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default productRouter;