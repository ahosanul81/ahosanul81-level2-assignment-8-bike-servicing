import { ZodError, ZodIssue } from "zod";

const handleZodErrors = (error: ZodError) => {
  const errorSource = error?.issues?.map((issue: ZodIssue) => ({
    expected: issue.expected,
    received: issue.received,
    path: issue.path[1],
    message: issue.message,
  }));
};
