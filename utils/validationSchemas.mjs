const commonChecks = {
  notEmpty: {
    errorMessage: "This field cannot be empty",
  },
  isString: {
    errorMessage: "This field must be a string",
  },
  trim: true,
};

export const createUserValidationSchema = {
  full_name: {
    ...commonChecks,
    isLength: {
      options: { min: 3 },
      errorMessage: "full_name must be at least 3 characters long",
    },
    isString: {
      errorMessage: "full_name must be a string",
    },
    trim: true,
  },
  school_ID: {
    ...commonChecks,
    isLength: {
      options: { min: 8 },
      errorMessage: "school_ID must be at least 8 characters long",
    },
    matches: {
      options: /^[A-Za-z0-9]+$/,
      errorMessage: "school_ID must contain only alphanumeric characters",
    },
    trim: true,
  },
  email: {
    ...commonChecks,
    isEmail: {
      errorMessage: "A valid email is required",
    },
    normalizeEmail: true,
    trim: true,
  },
  password: {
    ...commonChecks,
    isLength: {
      options: { min: 8, max: 128 },
      errorMessage: "Your password must be between 8 and 128 characters long",
    },
    matches: {
      options:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-_$#@!%*?&])[A-Za-z\d-_$#@!%*?&]{8,}$/,
      errorMessage:
        "Your password must include at least one uppercase letter, one lowercase letter, one number, and one symbol ",
    },
    trim: true,
  },
  role: {
    ...commonChecks,
    isIn: {
      options: [["STUDENT", "COURSE_ADVISOR", "LECTURER"]],
      errorMessage:
        "role must be one of the following: admin, student, lecturer",
    },
  },
  level: {
    optional: true,
    isInt: {
      errorMessage: "level should be a valid integer (e.g., 200, 300, 400)",
    },
    toInt: true,
  },
};

export const createCourseValidationSchema = {
  name: {
    ...commonChecks,
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "name must be at least 5 characters long",
    },
  },
  course_code: {
    ...commonChecks,
    isLength: {
      options: {
        min: 6,
        max: 6,
      },
      errorMessage: "course_code must be 6 characters long",
    },
    matches: {
      options: /^[A-Z0-9]+$/,
      errorMessage: "course_code must be uppercase alphanumeric",
    },
  },
  lecturer: {
    notEmpty: {
      errorMessage: "lecturer cannot be empty",
    },
  },
};
