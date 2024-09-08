
import {UserLogin} from '../utils/interface';


export const Badge = ({ matchuser }: { matchuser: UserLogin }) => {
    
    let badges: JSX.Element[] = [];
if (matchuser?.first_n) {
    badges = Array.from({ length: matchuser.first_n }).map((_, index) => (
      <div className="firstbadge" key={`first-${index}`}>
        <img
          src={`${process.env.PUBLIC_URL}/image/first.png`}
          alt="first"
          className="first"
        />
      </div>
    ));
  }

  if (matchuser?.second_n) {
    badges = badges.concat(
      Array.from({ length: matchuser.second_n }).map((_, index) => (
        <div className="secondbadge" key={`second-${index}`}>
          <img
            src={`${process.env.PUBLIC_URL}/image/second.png`}
            alt="second"
            className="second"
          />
        </div>
      ))
    );
  }

  if (matchuser?.third_n) {
    badges = badges.concat(
      Array.from({ length: matchuser.third_n }).map((_, index) => (
        <div className="thirdbadge" key={`third-${index}`}>
          <img
            src={`${process.env.PUBLIC_URL}/image/third.png`}
            alt="third"
            className="third"
          />
        </div>
      ))
    );
  }

    return (
        <div className="badge_field">
            <p className="badge-title">👑週間ランキング獲得バッチ👑</p>
            <div className="badges">
            {badges.length > 0 ? badges : <p className="not-badge-msg">まだバッチを取得したことがありません！</p>}
        </div>
    </div>
    )
}