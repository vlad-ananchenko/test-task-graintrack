import { Button, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

import useSignInForm from "../hooks/useSignInForm";

const SignInForm = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useSignInForm();

  return (
    <Form.Root className="form-root" onSubmit={handleSubmit}>
      <Form.Field className="form-field" name="email">
        <Flex justify="between" align="baseline">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Message className="form-message" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="form-message" match="typeMismatch">
            Please enter a valid email
          </Form.Message>
        </Flex>
        <Form.Control asChild>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="form-field" name="password">
        <Flex justify="between" align="baseline">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Message className="form-message" match="valueMissing">
            Please enter your password
          </Form.Message>
        </Flex>
        <Form.Control asChild>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <Button className="button">Sign In</Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default SignInForm;
