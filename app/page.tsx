"use client";

import {useEffect, useState} from "react";
import {getAllBirthdays} from "@/app/services/birthdays";


export default function Home() {
  return <h1>Добро пожаловать в пет-проект</h1>;
}

export function BirthdaysPage() {
  const defaultValues = {
    name: "",
    description: "",
    date: new Date(),
  } as Birthday;

  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBirthdays = async () => {
      const birthdays = await getAllBirthdays();
      setLoading(false);
      setBirthdays(birthdays);
    };

    getBirthdays();

  }, []);
}
