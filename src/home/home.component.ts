import { UsersService } from "../../angular/core";

const usersService = new UsersService();

const btn = document.getElementById("btn");
const input = document.getElementById("userId");
const loading = document.getElementById("loading");

btn.addEventListener("click", async () => {
  loading.innerHTML = "loading";
  await usersService
    .getUserById(+(input as HTMLInputElement).value)
    .then((x) => console.log(x));
  loading.innerHTML = "";
});