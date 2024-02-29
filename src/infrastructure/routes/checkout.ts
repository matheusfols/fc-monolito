import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
import { InvoiceGenerateFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";
import CheckoutFacadeFactory from "../../modules/checkout/factory/checkout.facade.factory";
import { CheckoutFacadeInputDto } from "../../modules/checkout/facade/checkout.facade.interface";


const checkoutRouter = express.Router();

checkoutRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = CheckoutFacadeFactory.create();

    const input: CheckoutFacadeInputDto = {
      clientId: req.body.clientId,
      products: req.body.products
    };


    const result = await facade.checkout(input);

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


export default checkoutRouter;