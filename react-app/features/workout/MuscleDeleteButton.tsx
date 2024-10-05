import React from "react";
import MuscleApiGateway from "../../services/api/gateway/MuscleApiGateway.tsx";
import DeleteButton from "../../components/button/DeleteButton.tsx";

type MuscleDeleteButtonType = {
    muscleId: number,
    callbackFunction: (muscleId: number) => void;
}

const MuscleDeleteButton: React.FC<MuscleDeleteButtonType> = ({ muscleId, callbackFunction }) => {
    const handleDeleteMuscle = async () => {
        try {
            await MuscleApiGateway.deleteMuscle(muscleId);
            callbackFunction(muscleId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DeleteButton targetId={muscleId} onConfirmDeleteFunction={handleDeleteMuscle} />
    )
}

export default MuscleDeleteButton;