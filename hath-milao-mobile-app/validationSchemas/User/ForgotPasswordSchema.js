import Joi from "react-native-joi";

const ForgotPasswordSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
});

export default ForgotPasswordSchema;
