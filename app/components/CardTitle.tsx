interface Props{
    name : string;
    date : Date;
}

interface Months {
    1 : 'января',
    2 : 'февраля',
    3 : 'марта',
    4 : 'апреля',
    5 : 'мая',
    6 : 'июня',
    7 : 'июля',
    8 : 'августа',
    9 : 'сентября',
    10 : 'октября',
    11 : 'ноября',
    12 : 'декабря'
  }

  function getMonth(month: keyof Months) {
    const monthDisplays = {
        1 : 'января',
        2 : 'февраля',
        3 : 'марта',
        4 : 'апреля',
        5 : 'мая',
        6 : 'июня',
        7 : 'июля',
        8 : 'августа',
        9 : 'сентября',
        10 : 'октября',
        11 : 'ноября',
        12 : 'декабря'
    }
  
    return monthDisplays[month] 
  }

export const CardTitle = ({name, date} : Props) => {
    const d = new Date(date);
    const currMonth = d.getMonth() + 1;
    return (
        <div style={{
            display:"flex",
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "space-between",
        }}>
            <p>{name}</p>
            <p>{d.getDate()} {getMonth(currMonth as keyof Months)} {d.getFullYear()}</p>
        </div>

    )
}