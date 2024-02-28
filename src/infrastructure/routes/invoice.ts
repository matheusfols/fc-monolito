import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
import { InvoiceGenerateFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";


const invoiceRouter = express.Router();

invoiceRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = InvoiceFacadeFactory.create();

    const input: InvoiceGenerateFacadeInputDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      zipCode: req.body.zipCode,
      state: req.body.state,
      items: req.body.items,
    };


    const result = await facade.generate(input);
    console.log(result)
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default invoiceRouter;