import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <Image
        className={cx('avatar')}
        src="https://p16-sign-sg.tiktokcdn.com/tiktok-obj/1662024598221826~c5_300x300.webp?x-expires=1676264400&x-signature=P%2FH6TDilXKA%2BWiI3q1tVCt6fUmc%3D"
        alt="avt"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span>Nguyen Van A</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <span className={cx('username')}>nguyenvanaa</span>
      </div>
    </div>
  );
}

export default AccountItem;
