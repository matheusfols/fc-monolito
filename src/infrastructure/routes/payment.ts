import express, { Request, Response } from "express";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import { PaymentFacadeInputDto } from "../../modules/payment/facade/facade.interface";


const paymentRouter = express.Router();

paymentRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = PaymentFacadeFactory.create();

    const input: PaymentFacadeInputDto = {
      orderId: req.body.orderId,
      amount: req.body.amount
    };


    const result = await facade.process(input);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default paymentRouter;