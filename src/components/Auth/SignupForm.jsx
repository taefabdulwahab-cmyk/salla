import React, { useContext } from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import Form from "./Form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function SignupForm() {
  const { t } = useLanguage();
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [SignupData, setSignupData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((per) => ({ ...per, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirm_password } = SignupData;
    if (password !== confirm_password) {
      console.log("Rejected");
      return;
    }
    addUser({
      name: SignupData.username,
      email: SignupData.email,
    });
    navigate("/");
    console.log("accepted", SignupData);
  };
  // min-sm:scale-95  grow w-full
  return (
    <div className="flex  grow w-full">
      <section className="flex-auto pr-3 pl-3">
        <div className=" sm:p-4 bg-white rounded-lg mx-auto sm:max-w-175 p-3">
          <div className="flex flex-col text-center justify-center mb-6 ">
            <h1 className="text-xl">{t("register")}</h1>
            <p className=" text-gray-500 ">{t("Registertocontinueshopping")}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="  flex flex-col w-full  gap-3"
          >
            <Form
              type="text"
              name="username"
              value={SignupData.username}
              onChange={handleChange}
              placeholder={t("username")}
            >
              {t("username")}
            </Form>

            <Form
              type="email"
              name="email"
              value={SignupData.email}
              onChange={handleChange}
              placeholder="example@example.com"
            >
              {t("Email")}
            </Form>

            <Form
              type="password"
              name="password"
              value={SignupData.password}
              onChange={handleChange}
              placeholder={t("password")}
            >
              {t("password")}
            </Form>
            <Form
              type="password"
              name="confirm_password"
              value={SignupData.confirm_password}
              onChange={handleChange}
              placeholder="****"
            >
              {t("Passwordconfirmation")}
            </Form>
            <div className="mt-4"></div>

            <div className="flex gap-4">
              <Button type="submit">{t("register")}</Button>

              <Link
                to="/login"
                className="w-fit text-[#004A57] underline p-2 text-md"
              >
                {t("alreadyhaveanaccount")}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
