import React, {FormEvent, useState} from "react";
import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/types";
import {editUserProfile} from "../../services/profile.service";
import styles from "../../features/editProfile/EditProfile.module.css";

// Interfaces
interface EditProfileProps {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component creation
const EditProfile: React.FC<EditProfileProps> = ({setIsEditing}) => {
    // React states
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    // Redux states
    const dispatch = useDispatch<AppDispatch>();

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleEditName = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newUserData = {
            firstName: newFirstName,
            lastName: newLastName,
        };
        const result = await dispatch(editUserProfile(newUserData));

        setIsEditing(false);

        return result
    };

    return (
        <form className={styles.editContent} onSubmit={handleEditName}>
            <div className={styles.editForm}>
                <InputField
                    id="name"
                    type="text"
                    placeholder="First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                />
                <InputField
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                />
            </div>
            <div className={styles.editBtns}>
                <Button type="button" variant="editActions" textContent="Cancel" onClick={handleCancel}/>
                <Button type="submit" variant="editActions" textContent="Save"/>
            </div>
        </form>
    )
};

export default EditProfile;