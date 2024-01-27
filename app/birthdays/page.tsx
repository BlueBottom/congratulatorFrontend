"use client";

import Button from "antd/es/button/button";
import {Birthdays} from "../components/Birthdays";
import {useEffect, useState} from "react";
import {BirthdayRequest, createBirthday, deleteBirthday, getAllBirthdays, updateBirthday} from "../services/birthdays";
import {CreateUpdateBirthday, Mode} from "../components/CreateUpdateBirthday";
import Title from "antd/es/typography/Title";


export default function BirthdaysPage() {
    const defaultValues = {
        name: "",
        description: "",
        date: new Date(),
    } as Birthday;

    const [values, setValues] = useState<Birthday>(defaultValues);

    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getBirthdays = async () => {
            const birthdays = await getAllBirthdays();
            setLoading(false);
            setBirthdays(birthdays);
        };

        getBirthdays();

    }, []);

    const handleCreateBirthday = async (request: BirthdayRequest) => {
        await createBirthday(request);
        closeModal();

        const birthdays = await getAllBirthdays();
        setBirthdays(birthdays);
    }

    const handleUpdateBirthday = async (id: string, request: BirthdayRequest) => {
        await updateBirthday(id, request);
        closeModal();

        const birthdays = await getAllBirthdays();
        setBirthdays(birthdays);
    }

    const handleDeleteBirthday = async (id: string) => {
        await deleteBirthday(id);
        closeModal();

        const birthdays = await getAllBirthdays();
        setBirthdays(birthdays);
    }

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    }

    const openEditModal = (birthday: Birthday) => {
        setMode(Mode.Edit);
        setValues(birthday);
        setIsModalOpen(true);
    }

    return (
        <div>
            <Button type="primary" onClick={openModal}>Добавить</Button>

            <CreateUpdateBirthday
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCreate={handleCreateBirthday}
                handleUpdate={handleUpdateBirthday}
                handleCancel={closeModal}
            />

            {loading ? (<Title>Загрузка...</Title>) : (
                <Birthdays birthdays={birthdays} handleOpen={openEditModal} handleDelete={handleDeleteBirthday}/>)}
        </div>
    );
}