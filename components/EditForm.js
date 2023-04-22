import { Controller, useController, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { editFormModalState } from "@/atom/modalAtom";
import "react-datepicker/dist/react-datepicker.css";
import { XIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { PhotographIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import "firebase/firestore";

export default function EditForm({userDetailsID}) {
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);
  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const { data: session } = useSession();

  const filePickerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "userDetails"), (snapshot) =>
      setUserDetails(snapshot.docs)
    );
  }, [db]);

  const details = userDetails.map((each) => {
    return {
      id: each.data().id,
      name: each.data().userName,
      location: each.data().location,
      description: each.data().description,
      dateOfBirth: each.data().dateOfBirth,
    };
  });
  const name = details.map((each)=>{
    if(each.name){
      return each.name
    }
  })

  // const det = details[0]
  // const secs = det.dateOfBirth.seconds;
  // const timestampInSeconds = secs;
  // const date = new Date(timestampInSeconds * 1000); // convert to milliseconds
  // const day = date.getDate().toString().padStart(2, "0");
  // const month = (date.getMonth() + 1).toString().padStart(2, "0"); // add 1 because January is 0
  // const year = date.getFullYear().toString();
  // const formattedDate = `${day}/${month}/${year}`;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: details.name,
      location: details.location,
      bio: details.description,
    },
  });

  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    control,
    name: "dateOfBirth",
    rules: { required: "Date of birth is required" },
    defaultValue: new Date(),
  });

  const onSubmitEditForm = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const docRef = {
      userName: data.name,
      description: data.bio,
      dateOfBirth: data.dateOfBirth,
      location: data.location,
      timestamp: serverTimestamp(),
    };
    if (userDetails.length > 0) {
      await updateDoc(doc(db, "userDetails", userDetailsID[0]), docRef)
        .then(() => {
          console.log("User details updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating user details: ", error);
        });

      const imageRef = ref(storage, `userDetails${docRef.id}/image`);
      if (selectedBgImage) {
        await uploadString(imageRef, selectedBgImage, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "userDetails", docRef.id), {
              image: downloadURL,
            });
          }
        );
      }
      setOpenEditForm(false);
      setSelectedBgImage(null);
      setLoading(false);
    } else {
      // Update the user document
      const docRef = await addDoc(collection(db, "userDetails"), {
        id: session.user.uid,
        userName: data.name,
        description: data.bio,
        dateOfBirth: data.dateOfBirth,
        location: data.location,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `userDetails${docRef.id}/image`);
      if (selectedBgImage) {
        await uploadString(imageRef, selectedBgImage, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "userDetails", docRef.id), {
              image: downloadURL,
            });
          }
        );
      }
      setOpenEditForm(false);
      setSelectedBgImage(null);
      setLoading(false);
    }
  };

  const addImageToUserDetails = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedBgImage(readerEvent.target.result);
    };
  };

  return (
    <div className="flex flex-col">
      {openEditForm && (
        <Modal
          isOpen={openEditForm}
          onRequestClose={() => setOpenEditForm(!openEditForm)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <form onSubmit={handleSubmit(onSubmitEditForm)}>
            <div className=" m-2 py-2 flex space-x-2 items-center -mb-2">
              <div
                onClick={() => setOpenEditForm(false)}
                className="hoverEffect w-11 h-10 flex items-center justify-center "
              >
                <XIcon className="h-5" />
              </div>
              <h4 className="font-bold"> Edit Your Profile</h4>
            </div>
            <div className="flex flex-col  justify-center">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Your Name"
                      defaultValue={name[0]}
                      className="rounded-xl p-2 space-x-2 m-2 hover:border-sky-500 "
                    />
                  </>
                )}
              />
              {errors.name && (
                <span className="text-red-500 ml-3 ">
                  {errors.name.message}
                </span>
              )}

              <DatePicker
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                dateFormat="MM/dd/yyyy"
                name="dateOfBirth"
                className="rounded-xl p-2 space-y-2 m-2 hover:border-sky-500 "
                placeholderText="Birth date"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 ml-3 ">
                  {errors.dateOfBirth.message}
                </span>
              )}

              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Location"
                      defaultValue={details[0].location}
                      className="rounded-xl p-2 space-x-2 m-2 hover:border-sky-500 "
                    />
                  </>
                )}
              />
              {errors.location && (
                <span className="text-red-500 ml-3 ">
                  {errors.location.message}
                </span>
              )}
              <Controller
                name="bio"
                control={control}
                rules={{ required: "Bio is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Bio"
                    defaultValue={details[0].description}
                    className="rounded-xl p-2 space-x-2 m-2 hover:border-sky-500"
                  />
                )}
              />

              {errors.bio && (
                <span className="text-red-500 ml-3 ">{errors.bio.message}</span>
              )}
              <div className="flex flex-col justify-center">
                <h2 className="text-green-300 m-3 -mb-2">Back-Ground Image</h2>
              </div>
              {selectedBgImage && (
                <div className="relative">
                  <XIcon
                    className="h-5  text-black rounded-full shadow-md shadow-white cursor-pointer absolute"
                    onClick={() => setSelectedBgImage(null)}
                  />
                  <img
                    src={selectedBgImage}
                    alt=""
                    className={`${loading && "animate-pulse"}`}
                  />
                </div>
              )}
              {!loading && (
                <>
                  <div
                    className=""
                    onClick={() => filePickerRef.current.click()}
                  >
                    <PhotographIcon className="h-10 w-10 text-sky-500 p-2 hoverEffect hover:bg-blue-100" />
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToUserDetails}
                    />
                  </div>{" "}
                </>
              )}
            </div>
            <div className="flex m-4 justify-between ">
              <button
                type="submit"
                className="bg-blue-400 rounded-full px-4 py-1.5 text-white hover:brightness-95 shadow-md disabled:opacity-50"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpenEditForm(false)}
                className="bg-red-400 rounded-full px-4 py-1.5 text-white hover:brightness-95 shadow-md disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
