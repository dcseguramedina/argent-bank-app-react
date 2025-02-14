import React from "react";
import InputField from "../inputField/InputField.tsx";
import Button from "../button/Button.tsx";

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'login' | 'edit' | 'editActions' | 'transaction';
    textContent: string;
    onClick?: () => void;
}

const EditForm: React.FC = () => {

return (
    <div className={styles.editContent}>
        <form className={styles.editForm} onSubmit={handleSave}>
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
        </form>
        <div className={styles.editBtns}>
            <Button type="button" variant="editActions" textContent="Cancel" onClick={handleCancel}/>
            <Button type="submit" variant="editActions" textContent="Save"/>
        </div>
    </div>
    )
};

export default EditForm;