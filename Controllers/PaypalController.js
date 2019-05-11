const paypal = require("../config/paypal");
const create_payment_json = require("../config/create_payment_json");


class PayPalController {
    request(req, res) {
        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                res.status(error.httpStatusCode).send(error.response);
            } else {
                const approvalUrl = payment.links.find(
                    link => link.rel === "approval_url"
                ).href;
                //console.log("Deu bom, deu feliz, pagamento criado");
                //console.log(payment);
                //res.status(201).json(payment);
                res.redirect(approvalUrl);
            }
        });
    }
    callback(req, res) {
        //res.status(200).send("callback");
        res.render("resumo.html", { ...req.query });
    }

    cancel(req, res) {
        res.status(200).send("cancel");
    }

    confirm(req, res) {
        const { paymentId, PayerID } = req.body;
        paypal.payment.execute(
            payment.id, 
            { "payer_id" : payerID }, 
            (error, payment) => {
                if (error) {
                    res.status(error.httpStatusCode).send(error.response);
                } else {
                    res.json({msg: "Parabéns"});
                }
            }
        );
    }
}

module.exports = new PayPalController();