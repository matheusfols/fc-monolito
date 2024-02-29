import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
import { InvoiceGenerateFacadeInputDto } from "../../modules/invoice/facade/invoice.facade.interface";


const invoiceRouter = express.Router();

invoiceRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.find({ id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default invoiceRouter;