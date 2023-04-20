import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { editFormModalState } from "@/atom/modalAtom";

export default function EditForm() {
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  //   const location = data.location.split(',').map(parseFloat);
  return (
    <div>
      {openEditForm && (
        <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DatePicker
              name="date"
              selected={null}
              onChange={(date) => setValue("date", date)}
              dateFormat="dd/MM/yyyy"
              ref={register({
                required: "Date is required",
              })}
            />
            {errors.date && <span>{errors.date.message}</span>}

            <input
              type="text"
              name="description"
              ref={register({
                required: "Description is required",
              })}
            />
            {errors.inputValue && <span>{errors.inputValue.message}</span>}
            <Input
              name="location"
              type="text"
              register={register({
                required: "Location is required",
                pattern: {
                  value:
                    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
                  message: "Invalid geolocation format",
                },
              })}
              placeholder="Enter geolocation (latitude, longitude)"
              error={errors.location && errors.location.message}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              )}
            />
            <input type="submit" />
          </form>
        </Modal>
      )}
    </div>
  );
}
