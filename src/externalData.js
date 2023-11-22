const remote = "https://static.wbstatic.net/data/main-menu-ru-ru.json";

export default function getExternalData(updateMainData) {
  fetch(remote)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      updateMainData(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
