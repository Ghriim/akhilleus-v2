import React from "react";
import DeleteButton from "../../components/button/DeleteButton.tsx";
import UserApiGateway from "../../services/api/gateway/UserApiGateway.tsx";

type UserDeleteButtonType = {
    userId: number,
    callbackFunction: (userId: number) => void;
}

const UserDeleteButton: React.FC<UserDeleteButtonType> = ({ userId, callbackFunction }) => {
    const handleDeleteUser = async () => {
        try {
            await UserApiGateway.deleteUser(userId);
            callbackFunction(userId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
       <DeleteButton targetId={userId} onConfirmDeleteFunction={handleDeleteUser} />
    )
}

export default UserDeleteButton;