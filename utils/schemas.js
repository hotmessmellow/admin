const userSchema = {
  title: "Register",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Full Name",
      minLength: 3,
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
    },
    walletAddress: {
      type: "string",
      title: "Wallet Address",
    },
    phoneNumber: {
      type: "string",
      title: "Phone Number",
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8,
    },

    college: {
      type: "string",
      title: "College",
    },
    major: {
      type: "string",
      title: "Major",
    },
    class: {
      type: "string",
      title: "Class/Year",
    },
    role: {
      type: "string",
      title: "Role",
      enum: ["Admin", "Teacher", "Student"],
      enumNames: ["Admin", "Teacher", "Student"],
    },
  },
};

const studentSchema = {
  title: "Student",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Username",
      minLength: 3,
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
    },
    walletAddress: {
      type: "string",
      title: "Wallet Address",
    },
    school: {
      type: "string",
      title: "School",
    },
    major: {
      type: "string",
      title: "Major",
    },
    class: {
      type: "string",
      title: "Class/Year",
    },
  },
};

const teacherSchema = {
  title: "Teacher",
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "Username",
      minLength: 3,
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
    },
    walletAddress: {
      type: "string",
      title: "Wallet Address",
    },
    school: {
      type: "string",
      title: "School",
    },
    major: {
      type: "string",
      title: "Major",
    },
  },
};

const loginSchema = {
  title: "Login",
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "Email",
      minLength: 5,
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8,
    },
  },
};

const emailShema = {
  title: "Reset Password Form",
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "Email",
      format: "email",
    },
  },
};

const passwordSchema = {
  title: "Password Reset",
  type: "object",
  properties: {
    password: {
      type: "string",
      title: "Password",
      minLength: 8,
    },
    confirmPassword: {
      type: "string",
      title: "Confirm Password",
      minLength: 8,
    },
  },
};

const rewardSchema = {
  title: "Information Form",
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
    },

    teacher: {
      type: "object",
      title: "Teacher",
    },
    student: {
      type: "string",
      title: "Student",
    },
    school: {
      type: "string",
      title: "School",
    },
    rewardId: {
      type: "string",
      title: "Reward ID",
    },
  },
};

module.exports = {
  userSchema,
  rewardSchema,
  studentSchema,
  teacherSchema,
  loginSchema,
  emailShema,
  passwordSchema,
};
