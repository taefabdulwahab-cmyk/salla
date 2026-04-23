import React from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import Form from "../form/Form";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({
      username: loginData.username,
      password: loginData.password,
    });
    navigate("/Salla");
  };

  return (
    <div className="flex grow w-full ">
      <section className="flex-auto pr-3 pl-3">
        <div className=" sm:p-4 bg-white rounded-lg  mx-auto sm:max-w-175 p-3">
          <div className="flex flex-col text-center justify-center mb-6 ">
            <h1 className="text-xl">Login</h1>
            <p className=" text-gray-500 ">Login to continue shopping</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="  flex flex-col w-full gap-3"
          >
            <Form
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="email"
            >
              User Name
            </Form>

            <Form
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="password"
            >
              Password
            </Form>

            <div className="mt-4"></div>

            <div className="flex gap-4">
              <Button type="submit" onSubmit={handleSubmit}>
                Login
              </Button>

              <Link
                to="/signup"
                className="w-fit text-[#004A57] underline p-2 text-md"
              >
                don't have an account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
