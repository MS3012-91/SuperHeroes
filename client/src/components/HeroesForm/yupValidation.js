import * as yup from "yup";

const MAX_FILE_SIZE = 307200;

const SUPPORTED_FORMATS = ["image/jpeg", "image/gif", "image/png"];

export const yupValidation = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .min(4, "Nickname is too short")
    .max(50, "Nickname is too long")
    .required("Nickname is required"),
  realName: yup
    .string()
    .trim()
    .min(4, "Real name is too short")
    .max(50, "Real name is too long"),
  originDescription: yup
    .string()
    .trim()
    .min(4, "Description is too short")
    .max(100, "Description is too long"),
  catchPhrase: yup
    .string()
    .trim()
    .min(4, "Catch phrase is too short")
    .max(100, "Catch phrase is too long"),
  heroPhoto: yup
    .mixed()
    .nullable()
    .test(
      "fileSize",
      "File Size is too large",
      (file) => !file || (file && `${file.size}` <= MAX_FILE_SIZE)
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
    ),
});
