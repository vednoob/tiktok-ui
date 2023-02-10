import classNames from 'classnames/bind';
import styles from './Header.module.scss';

// do not clear this line -> bind object styles to classNames and return a function to cx.
// So when using cx to create a claas
// , this help us create class using "-"  class-name
const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* {Logo} */}
        {/* {Search} */}
      </div>
    </header>
  );
}

export default Header;
