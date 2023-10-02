const base_url_api = "/v1/users";

const base_headers = [
  {
    text: "Username",
    align: "start",
    sortable: false,
    value: "username",
  },
  { text: "Name", value: "name", sortable: false },
  // { text: "email", value: "email", sortable: false },
  // { text: "phoneNumber", value: "phoneNumber", sortable: false },
  // { text: "nickname", value: "nickname", sortable: false },
  { text: "dateOfBirth", value: "dateOfBirth", sortable: false },
  { text: "gender", value: "gender", sortable: false },
  { text: "ethnicID", value: "ethnicID", sortable: false },
  { text: "language", value: "language", sortable: false },
  { text: "Role", value: "role", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
];

// it's a payload, you can change it to your own
//user schema is username,password,citizenId,name,nickname, phoneNumber, dateOfBirth, gender, address.district address.subDistrict., ethnicID,language,email,role
const base_schema = {
  username: "",
  password: "123456",
  citizenId: "5358701256970",
  name: "",
  nickname: "test",
  phoneNumber: "0123456789",
  dateOfBirth: "1989-10-01",
  gender: "female",
  district: "64bf6a0c0bf3e808e8b7a252",
  subDistrict: "64ba07f8f8c2f00abfdafbe7",
  ethnicID: "64b96d0baf19fd3e3a1fee4e",
  language: "Thai",
  email: "something@test.com",
  role: "counselor",
};

const base_data = {
  base_url_api: base_url_api,
  items: [],
  editedItem: base_schema,
  defaultItem: base_schema,
  headers: base_headers,

  gender: ["male", "female", "other"],
  role: ["counselor", "user", "admin"],
  appointmentID: [],
};

export const users_api = {
  data() {
    return base_data;
  },

  async fetch() {
    try {
      const response = await this.$axios.$get(`${this.base_url_api}`);
      this.items = response.response;
    } catch (error) {
      this.error_handler(error);
    }
  },
};
