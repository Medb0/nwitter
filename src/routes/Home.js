import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { dbService, firebaseApp, storageService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const docRef = collection(dbService, "nweets");
  const qu = query(docRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(qu, (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id, ...document.data(),
        }));
        setNweets(newArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(docRef, {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      });
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;