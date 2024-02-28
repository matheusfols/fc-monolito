import express, { Request, Response } from "express";
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

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

invoiceRouter.get("/:id", async (req: Request, res: Response) => {
  console.log('req.params', req.params)
  try {
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.find({ id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default invoiceRouter;