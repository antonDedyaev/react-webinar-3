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

function Profile() {
  const store = useStore();

  const select = useSelector((state) => ({
    profile: state.profile.currentProfile,
    authStatus: state.user.isAuth,
    waiting: state.user.waiting,
  }));

  useInit(() => {
    store.actions.profile.loadProfile();
  }, [select.isAuth]);

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
