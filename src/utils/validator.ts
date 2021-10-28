import joi, { ValidationResult } from "joi";

export const loginValidator = (data: any): ValidationResult => {
  let checkSchemaForEmail = joi.object({
    email: joi.string().lowercase().min(9).max(30).email().required(),
    password: joi.string().required(),
    type: joi.string().required(),
  });
  let checkSchemaForUserName = joi.object({
    user_name: joi.string().lowercase().min(6).max(15).token().required(),
    password: joi.string().required(),
    type: joi.string().required(),
  });
  if (data.type === undefined || data.type === null || data.type === "") {
    return checkSchemaForEmail.validate(data);
  } else if (data.type === "email") {
    return checkSchemaForEmail.validate(data);
  } else if (data.type === "user_name") {
    return checkSchemaForUserName.validate(data);
  } else {
    return checkSchemaForEmail.validate(data);
  }
};

export const signUpValidator = (data: any) => {
  let checkSchema = joi.object({
    name: joi.string().required(),
    user_name: joi.string().required().min(6).max(15).token().lowercase(),
    email: joi.string().lowercase().min(9).max(30).email().required(),
    password: joi.string().required(),
    confirm_password: joi.string().required(),
    profile_url: joi.string().required(),
  });
  return checkSchema.validate(data);
};
