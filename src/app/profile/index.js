import { memo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../containers/header";
import ProfileCard from "../../components/profile-card";
import { useNavigate } from "react-router-dom";

function Profile() {
  const store = useStore();
  const isAuthenticated = !!localStorage.getItem("currentUser");

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    profile: state.user.data,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      store.actions.user.loadProfile();
    }
  }, [isAuthenticated]);

  const { t } = useTranslate();

  return (
    <PageLayout head={<Header />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard profile={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
