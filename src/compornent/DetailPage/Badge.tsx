
import {UserLogin} from '../../utils/interface';


export const Badge = ({ matchuser }: { matchuser: UserLogin }) => {
    
    const badgeTypes = [
        { 
            count: matchuser?.first_n || 0, 
            image: `${process.env.PUBLIC_URL}/image/first.png`, 
            alt: "1位", 
            className: "first-badge-group",
            label: "🥇 1位"
        },
        { 
            count: matchuser?.second_n || 0, 
            image: `${process.env.PUBLIC_URL}/image/second.png`, 
            alt: "2位", 
            className: "second-badge-group",
            label: "🥈 2位"
        },
        { 
            count: matchuser?.third_n || 0, 
            image: `${process.env.PUBLIC_URL}/image/third.png`, 
            alt: "3位", 
            className: "third-badge-group",
            label: "🥉 3位"
        }
    ];

    const hasAnyBadges = badgeTypes.some(badge => badge.count > 0);

    return (
        <div className="badge_field">
            <p className="badge-title">👑週間ランキング獲得バッチ👑</p>
            <div className="badges">
                {hasAnyBadges ? (
                    <div className="badge-summary">
                        {badgeTypes.map((badge, index) => 
                            badge.count > 0 && (
                                <div key={index} className={`badge-group ${badge.className}`}>
                                    <img
                                        src={badge.image}
                                        alt={badge.alt}
                                        className="badge-icon"
                                    />
                                    <span className="badge-count">×{badge.count}</span>
                                    <span className="badge-label">{badge.label}</span>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <p className="not-badge-msg">まだバッチを取得したことがありません！</p>
                )}
            </div>
        </div>
    )
}