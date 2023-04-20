import { Controller, useController, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { editFormModalState } from "@/atom/modalAtom";
import "react-datepicker/dist/react-datepicker.css";
import { XIcon } from "@heroicons/react/solid";
import { PhotographIcon } from "@heroicons/react/outline";
import { useRef } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function EditForm() {
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);
  const filePickerRef = useRef(null);

  const addBgImageToPost = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    control,
    name: "dateOfBirth",
    rules: { required: "Date of birth is required" },
    defaultValue: "",
  });

  const onSubmit = (data) =>{
    setOpenEditForm(false)
  } 

  return (
    <div className="flex flex-col">
      {openEditForm && (
        <Modal
          isOpen={openEditForm}
          onRequestClose={() => setOpenEditForm(!openEditForm)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            
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
                      className="rounded-xl p-2 space-x-2 m-2"
                    />
                  </>
                )}
              />
              {errors.name && <span  className="text-red-500 ml-3 ">{errors.name.message}</span>}

                <DatePicker
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                dateFormat="MM/dd/yyyy"
                name="dateOfBirth"
                className="rounded-xl p-2 space-y-2 m-2"
                placeholderText="Birth date"
              />
              {errors.dateOfBirth && <span  className="text-red-500 ml-3 ">{errors.dateOfBirth.message}</span>}
              

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
                      className="rounded-xl p-2 space-x-2 m-2"
                    />
                  </>
                )}
              />
              {errors.location && <span  className="text-red-500 ml-3 ">{errors.location.message}</span>}
              <Controller
                name="bio"
                control={control}
                rules={{ required: "Bio is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Bio"
                    className="rounded-xl p-2 space-x-2 m-2"
                  />
                )}
              />

              {errors.bio && <span className="text-red-500 ml-3 ">{errors.bio.message}</span>}
              <div className="flex flex-col justify-center">
              <h2 className="text-blue-500 m-3 -mb-2">
                Back-Ground Image
              </h2>
              <input
                type="file"
                name="backgroundImage"
                ref={register()}
                className="rounded-xl p-2 space-x-2 m-2"
                />
                </div>
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
