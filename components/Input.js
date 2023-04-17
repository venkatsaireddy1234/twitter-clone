import { db, storage } from "@/firebase";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };
  const addImageToPost = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    <>
      {session && (
        <div className="flex space-x-3 border-b border-gray-300 p-3 ">
          <img
            onClick={signOut}
            src={session.user.image}
            alt="user-image"
            className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-300">
            <div>
              <textarea
                placeholder="what's happening"
                rows="2"
                className="w-full placeholder-gray-700 text-lg  border-none focus:ring-0 text-gray-700 min-h-[50px] tracking-wide"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  className="h-5  text-black rounded-full shadow-md shadow-white cursor-pointer absolute"
                  onClick={() => setSelectedFile(null)}
                />
                <img
                  src={selectedFile}
                  alt=""
                  className={`${loading && "animate-bounce"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 text-sky-500 p-2 hoverEffect hover:bg-blue-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 text-sky-500 p-2 hoverEffect hover:bg-blue-100" />
                  </div>
                  <button
                    disabled={!input.trim()}
                    onClick={sendPost}
                    className="bg-blue-400 rounded-full px-4 py-1.5 text-white hover:brightness-95 shadow-md disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
