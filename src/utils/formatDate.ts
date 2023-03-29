export default function formatDate(dateString: string) {
    // formatage en jj/mm/aaaa h:m
    let date = new Date(dateString);
    let formattedDate =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();
    let formattedTime = date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
    return formattedDate + " " + formattedTime;
}
