import { FaGithub } from "react-icons/fa";
import { DetailUser, UserLogin } from "../utils/interface";

export const Profile = ({ matchuser, usersData, loginID }: { matchuser: UserLogin ,usersData: DetailUser[], loginID: string}) => {
    return (
        <div className="profile">
          <img
            src={usersData[0].avatarUrl}
            alt={`${usersData[0].name} Avatar`}
            className="avatarurl"
          />
          <h2 className="name">{matchuser?.username}</h2>
          <a
            href={"https://github.com/" + loginID}
            className="githubpagelink"
            target="_blank"
          >
            <FaGithub size={50} />
          </a>
          <img 
        src={`https://github-readme-stats.vercel.app/api/top-langs?username=${loginID}&show_icons=true&locale=en&layout=compact`}
        alt="GitHub Top Languages"
        className="top-langs"
      />
        </div>
    )

}