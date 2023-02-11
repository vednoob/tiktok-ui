import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  return <h1 className={cx('h1')}>Home Page content over here</h1>;
}

export default Home;
