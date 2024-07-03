import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const content = (
    <main className="w-full min-h-screen   bg-[#1c2121]  text-white  flex justify-center  items-center  ">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[80%]    border-2 border-white  min-h-[10rem] flex flex-col  gap-3  justify-center items-center p-2"
      >
        <div className="form-div-style">
          <label htmlFor="FullName" className="form-label-style">
            Fullname:{" "}
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            name="fullName"
            className={`form-input-style  ${
              errors.firstName ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors.firstName && (
            <p className="error-msg-style">Please fill this field.</p>
          )}
        </div>
        <input
          type="submit"
          title="Let's Go"
          className="bg-[#0a572a]  text-xl tracking-wide rounded-lg  mx-auto block  p-2"
        />
      </form>
    </main>
  );

  return content;
}
