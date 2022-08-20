import Banner from "./OverView";
import MovieShowing from "./MovieShowing";
import styles from "_Playground/SCSS/HomePage/HomePage.module.scss";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Banner />
      <MovieShowing />
    </>
  );
};

export default HomePage;
