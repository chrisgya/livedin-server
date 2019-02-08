import { buildSchema } from "type-graphql";
import { MeResolver } from "../modules/user/me/Me";
import { ChangePasswordResolver } from "../modules/user/changePassword/ChangePassword";
 import { ForgotPasswordResolver } from "../modules/user/forgotPassword/ForgotPassword";
 import { LoginResolver } from "../modules/user/login/Login";
 import { LogoutResolver } from "../modules/user/logout/Logout";
 import { RegisterResolver } from "../modules/user/register/Register";
 import { RequestConfirmationLinkResolver } from "../modules/user/requestConfirmationLink/RequestConfrimationLink";
 import { ResetPasswordResolver } from "../modules/user/resetPassword/ResetPassword";
 import { UpdateProfileResolver } from "../modules/user/updateProfile/UpdateProfile";
 import { ProfilePictureResolver } from "../modules/user/updateProfile/ProfilePicture";
import { CreateUpdateReviewResolver } from "../modules/reviews/create-update/CreateUpdateReview";
import { ConfirmResolver } from "../modules/user/confirm/Confirm";
import { FindReviewResolver } from "../modules/reviews/find/Reviews";
import { LikeReviewResolver } from "../modules/reviews/like-review/LikeReview";
import { CreateCommentResolver } from "../modules/reviews/comment/createComment";
import { LikeCommentResolver } from "../modules/reviews/like-comment/LikeComment";
import { FindCommentResolver } from "../modules/reviews/comment/find-comments";
import { FindContactResolver } from "../modules/contact/find/contacts";
import { DeleteContactResolver } from "../modules/contact/delete/DeleteContact";
import { CreateContactResolver } from "../modules/contact/create/CreateContact";
import { FindEmailSubscriptionsResolver } from "../modules/emailSubscription/find/emailSubscriptions";
import { CreateEmailSubscriptionResolver } from "../modules/emailSubscription/create/createEmailSubscription";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
       ForgotPasswordResolver,
       LoginResolver,
       LogoutResolver,
       MeResolver,
       RegisterResolver,
       RequestConfirmationLinkResolver,
       ConfirmResolver,
       ResetPasswordResolver,
       UpdateProfileResolver,
       ProfilePictureResolver,
       CreateUpdateReviewResolver,
       LikeReviewResolver,
       FindReviewResolver,
       CreateCommentResolver,
       LikeCommentResolver,
       FindCommentResolver,
       DeleteContactResolver,
       CreateContactResolver,
       FindContactResolver,
       FindEmailSubscriptionsResolver,
       CreateEmailSubscriptionResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

