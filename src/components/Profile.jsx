import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { signUpSchema } from "../utils/schema";
import { useForm } from "react-hook-form";
import { useState } from "react";

    const Profile = () => {
    const user = useSelector((store) => store.user) || {};
    const { firstName, lastName, emailId } = user;
    const [profileUpdated, setProfileUpdated] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, errors, dirtyFields },
    } = useForm({
        defaultValues: {
        firstName,
        lastName,
        emailId,
        },
    });

    const [profileEdit, setProfileEdit] = useState(false);
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        setLoginError("");

        if (!isDirty) {
        // nothing changed, so just exit edit mode
        setProfileEdit(false);
        return;
        }

        // build an object of only the changed fields
        const updates = Object.keys(dirtyFields).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
        }, {});
        console.log(updates);
        try {
        await axios.patch(
            "http://13.53.143.156:3000/profile/edit",
            updates,
            { withCredentials: true }
        );
        // reset form state to the newly submitted values
        reset(data);
        setProfileUpdated(true);
        setTimeout(() => {
            setProfileUpdated(false)
        },3000)

        } catch (error) {
        const msg = error.response?.data?.message || error.message;
        setLoginError(msg);
        }
    };

    return (
        <div className="p-6 @container">
        <div className="card card-side bg-base-100 shadow-sm w-fit">
            <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Profile avatar"
            />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Your account details</h2>
                <p>Click the button to edit your details</p>

                {loginError && (
                    <p className="text-error">
                    {loginError}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-border justify-center mx-auto h-min self-center bg-base-100 w-100 shadow-sm flex flex-col"
                >
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">First name:</legend>
                    <input
                        type="text"
                        className="w-100 input"
                        placeholder="Type here"
                        disabled={!profileEdit}
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <span className="text-sm text-error">
                        {errors.firstName.message}
                        </span>
                    )}
                    </fieldset>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last name:</legend>
                    <input
                        type="text"
                        className="w-100 input"
                        placeholder="Type here"
                        disabled={!profileEdit}
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <span className="text-sm text-error">
                        {errors.lastName.message}
                        </span>
                    )}
                    </fieldset>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email:</legend>
                    <input
                        type="email"
                        className="w-100 input"
                        placeholder="Type here"
                        disabled={!profileEdit}
                        {...register("emailId")}
                    />
                    {errors.emailId && (
                        <span className="text-sm text-error">
                        {errors.emailId.message}
                        </span>
                    )}
                    </fieldset>
                    {profileUpdated && <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Your account details have been updated!</span>
                    </div>}

                    <div className="card-actions justify-end mt-4">
                        {!profileEdit ? (
                            <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setProfileEdit(true)}
                            >
                            Edit
                            </button>
                        ) : (
                            <>
                            <button
                                type="button"
                                className="btn btn-outline btn-error"
                                onClick={() => {
                                reset({ firstName, lastName, emailId });
                                setProfileEdit(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Profile;
