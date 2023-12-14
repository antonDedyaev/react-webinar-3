import { memo, useCallback, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("currentUser");

  const select = useSelector((state) => ({
    profile: state.user.data,
    errorMessage: state.user.error,
  }));

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  useInit(() => {
    store.actions.user.resetError();
  }, []);

  useInit(() => {
    isAuthenticated ? navigate("/profile") : navigate("/login");
  }, [select.profile]);

  const callbacks = {
    handleInputChange: useCallback(
      (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        store.actions.user.resetError();
      },
      [store, formData]
    ),

    submitForm: useCallback(
      (event) => {
        event.preventDefault();
        store.actions.user.login(formData);
        setFormData({
          login: "",
          password: "",
        });
      },
      [store, formData]
    ),
  };

  const { t } = useTranslate();

  return (
    <PageLayout head={<Header />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        formData={formData}
        onChange={callbacks.handleInputChange}
        onSubmit={callbacks.submitForm}
        errorMessage={select.errorMessage}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
