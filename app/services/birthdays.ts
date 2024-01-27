export interface BirthdayRequest {
    name : string;
    description: string;
    date: Date;
}

export const getAllBirthdays = async(intervalTime: string, searchString: string) => {
    const response = await fetch(`http://localhost:5149/Birthdays?intervalTime=${intervalTime}&searchString=${searchString}`);

    return response.json();
};

export const createBirthday = async(birthdayRequest: BirthdayRequest) => {
    await fetch("http://localhost:5149/Birthdays", {
        method : "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(birthdayRequest),
    });
};

export const updateBirthday = async(id: string, birthdayRequest: BirthdayRequest) => {
    await fetch(`http://localhost:5149/Birthdays/${id}`, {
        method : "PUT",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(birthdayRequest),
    });
};

export const deleteBirthday = async(id : string) => {
    await fetch(`http://localhost:5149/Birthdays/${id}`, {
        method : "DELETE",
    });
};
