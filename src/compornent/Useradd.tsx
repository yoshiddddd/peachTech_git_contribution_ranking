import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebaseConfig"; 
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../css/Useradd.css";
import { UserData } from "../utils/interface";

export const Useradd = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserData>({});
  const collectionRef = collection(database, "users");
  useEffect(() => {
    getDocs(collectionRef).then((responce) => {
      console.log(
        responce.docs.map((user) => {
          return { ...user.data(), id: user.id };
        })
      );
    });
  }, []);
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
    console.log(data.password);
  };

  const handleSubmit = async () => {
    if (data.password != process.env.REACT_APP_USER_ADD_PWD) {
      alert("パスワードが違います");
      return;
    }

    if (data.githubID && data.name) {
      // githubIDで既存のデータを検索
      const querySnapshot = await getDocs(
        query(collectionRef, where("githubID", "==", data.githubID))
      );
      if (!querySnapshot.empty) {
        alert("このGitHub IDはすでに存在します。");
        return;
      }

      addDoc(collectionRef, { githubID: data.githubID, name: data.name })
        .then((response) => {
          navigate("/");
          alert("データ登録完了");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("入力してください");
    }
  };

  return (
    <div>
      <Header />
      <div className="App-header">
        <input
          placeholder="github ID"
          name="githubID"
          type="githubID"
          className="input-fields"
          onChange={handleInputs}
        />
        <input
          placeholder="name"
          name="name"
          type="name"
          className="input-fields"
          onChange={handleInputs}
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          onChange={handleInputs}
        />
        <button onClick={handleSubmit}>登録</button>
      </div>
    </div>
  );
};
