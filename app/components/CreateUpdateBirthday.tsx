import Modal from "antd/es/modal/Modal";
import { BirthdayRequest } from "../services/birthdays";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import dayjs from 'dayjs';
import { DatePicker } from 'antd';


interface Props {
    mode : Mode;
    values : Birthday;
    isModalOpen : boolean;
    handleCancel: () => void;
    handleCreate: (request: BirthdayRequest) => void;
    handleUpdate: (id: string, request: BirthdayRequest) => void;   
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBirthday = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
} : Props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        setName(values.name);
        setDescription(values.description);
        setDate(new Date(values.date));
    }, [values]);

    const handleOnOk = async () => {
        const birthdayRequest = {name, description, date};

        mode == Mode.Create 
        ? handleCreate(birthdayRequest) 
        : handleUpdate(values.id, birthdayRequest)
    }

    return (
        <Modal title={mode === Mode.Create ? "Добавить" : "Редактировать"} open={isModalOpen} cancelText={"Отмена"} onOk={handleOnOk} onCancel={handleCancel}>
            <Input
                maxLength={200}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
            />

            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
            />

            <DatePicker
                defaultValue={dayjs(date)}
                onChange={(e)=>setDate(dayjs(e, 'YYYY-MM-DD').toDate())}
            />

        </Modal>
    );
};