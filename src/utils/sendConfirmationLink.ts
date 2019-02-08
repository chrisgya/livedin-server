import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { sendEmail } from "./sendEmail";
import { redis } from "../redis";
import { sendEmailProd } from "./sendEmailProd";

export const SendConfirmationLink = async(url: string, userId: string, email: string, firstname: string) => {

    const confirmLink = await createConfirmEmailLink(userId, redis);

      if(process.env.NODE_ENV === 'development'){
      await sendEmail(
        email,
        confirmLink,
        "confirm email"
      );
      } else {
        const subject = 'Activation Link';
        const text = `Hello ${firstname}, You have been registered on Lived-in.com.  
                    Please click on the following link to complete your activation: ${ confirmLink }`;
        const bodyMsg = 'You have been registered on Lived-in.com. <br><br>Please click on the link below to complete your account activation';
        const urlTitle = 'Click here to activate now';

       await sendEmailProd(email, subject , firstname, bodyMsg, text, urlTitle, url)
      }


    }