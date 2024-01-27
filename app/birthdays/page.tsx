"use client";

import Button from "antd/es/button/button";
import {Birthdays} from "../components/Birthdays";
import {useEffect, useRef, useState} from "react";
import {BirthdayRequest, createBirthday, deleteBirthday, getAllBirthdays, updateBirthday} from "../services/birthdays";
import {CreateUpdateBirthday, Mode} from "../components/CreateUpdateBirthday";
import Title from "antd/es/typography/Title";
import {Select, Space} from "antd";
import method from "async-validator/dist-types/validator/method";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import Input from "antd/es/input/Input";


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
    const [value, setSelectValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const getBirthdays = async () => {
            const birthdays = await getAllBirthdays(value, inputValue);
            setLoading(false);
            setBirthdays(birthdays);
        };

        getBirthdays();

    }, []);

    const handleCreateBirthday = async (request: BirthdayRequest) => {
        await createBirthday(request);
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(birthdays);
    }

    const handleUpdateBirthday = async (id: string, request: BirthdayRequest) => {
        await updateBirthday(id, request);
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(birthdays);
    }

    const handleDeleteBirthday = async (id: string) => {
        await deleteBirthday(id);
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
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

    const handleChange = (value: string) => {
        setSelectValue(value);
    };

    const handleInput = (inputValue: string) => {
        setInputValue(inputValue);
    }

    const applyFilter = async () => {
        setLoading(true);
        const filteredBirthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(filteredBirthdays);
        setLoading(false);
    };


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
            <Select
                defaultValue="Все"
                style={{ width: 180 }}
                onChange={handleChange}
                options={[
                    { label: 'Все', value: 'all'},
                    { label: 'Сегодня', value: 'today' },
                    { label: 'Завтра', value: 'tomorrow' },
                    { label: 'Ближайшие 10 дней', value: '10 days' },
                    { label: 'В этом месяце', value: 'this month' },
                ]}
            />
            <Input placeholder={"Введите имя"} style={{ width: 180 }}  onChange={(e) => setInputValue(e.target.value)}/>
            <Button type="primary" onClick={applyFilter}>Применить</Button>

            {loading ? (<Title>Загрузка...</Title>) : (
                <Birthdays birthdays={birthdays} handleOpen={openEditModal} handleDelete={handleDeleteBirthday}/>)}
        </div>
    );
}